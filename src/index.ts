import 'dotenv/config';
import 'app-module-path/register';
import request from 'request';
import path from 'path';
import fs from 'fs';

const url = process.env.MAIN_ADDRESS + process.env.ARCAEA_API_VERSION;

function base64encode(text: string) {
    const base64 = Buffer.from(text).toString('base64');
    const utf8 = Buffer.from(base64).toString('utf-8');
    return utf8;
}

class Request {
    public headers: any = {
        Accept: '*/*',
        AppVersion: '3.0.0',
        DeviceId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
        'Accept-Language': 'ko-KR',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accept-Encoding': 'br, gzip, deflate',
        'User-Agent': 'CFNetwork/976 Darwin/18.2.0',
    };

    public async post(subUrl: string, data?: any): Promise<any> {
        return this.req(subUrl, 'POST', data);
    }

    public async get(subUrl: string, qs: any): Promise<any> {
        return this.req(subUrl, 'GET', qs);
    }

    public async req(subUrl: string, method: string, qs: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let options = {
                uri: url + subUrl,
                method,
                headers: this.headers,
                gzip: true,
                json: true,
            };
            if (!!qs) {
                if (method === 'POST') {
                    options['body'] = qs;
                } else {
                    options['qs'] = qs;
                }
            }
            request(options, (err, _res, body) => {
                if (err) {
                    return reject(err);
                }
                return resolve(body);
            });
        });
    }
}

class ArcaeaMember {
    private requester: Request = new Request();

    constructor() {
        console.log(' - ArcaeaMember 객체 생성됨');
    }

    public async login(id: string, password: string): Promise<boolean> {
        this.requester.headers.Authorization = 'Basic ' + base64encode(id + ':' + password);
        const result = await this.requester.post('auth/login');
        if (result.success) {
            this.requester.headers.Authorization = 'Bearer ' + result.access_token;
            console.log(' - Login 성공');
        }
        delete this.requester.headers.DeviceId;
        return result.success;
    }

    public async getInfo() {
        const result = await this.requester.get('user/me', {});
        console.log(JSON.stringify(result));
    }

    public async addFriend(friendCode: number) {
        const data = await this.requester.post('friend/me/add', 'friend_code=' + friendCode);
        return data.value.friends[0].user_id;
    }

    public async delFriend(friendId: number) {
        return await this.requester.post('friend/me/delete', 'friend_id=' + friendId);
    }

    public async getFriendInfo(friendCode: number) {
        const songs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'song.json'), { encoding: 'utf-8' })).songs;
        let result: any[] = [];

        await Promise.all(
            songs.map(async (song: any) => {
                for (let difficulty = 0; difficulty <= 2; difficulty++) {
                    const temp = await this.requester.get('score/song/friend', {
                        song_id: song.id,
                        difficulty,
                        start: 0,
                        limit: 100,
                    });
                    await Promise.all(
                        temp.value.map(async (item: any) => {
                            if (item.user_id === friendCode) {
                                result.push({
                                    song_id: item.song_id,
                                    difficulty: item.difficulty,
                                    score: item.score,
                                    time_played: item.time_played,
                                    best_clear_type: item.best_clear_type, // 0이면 트랙 로스트, 1이면 그냥 클리어, 2이면 풀 리콜, 3이면 퓨어 메모리, 4면 이지게이지 클리어, 5면 하드클
                                });
                            }
                        })
                    );
                }
            })
        );

        fs.writeFileSync('test.json', JSON.stringify(result));
        return result;
    }
}

async function main() {
    const user = new ArcaeaMember();
    await user.login('tester2234', 'tester223344');
    await user.getInfo();

    const cycle = await user.addFriend(454875584);
    console.time('Data mining');
    await user.getFriendInfo(cycle);
    console.timeEnd('Data mining');

    await user.delFriend(cycle);
}

main().catch((err) => console.error(err));
