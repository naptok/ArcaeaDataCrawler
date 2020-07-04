import { Request } from './Request';
import { base64encode } from './base64';
import fs from 'fs';
import path from 'path';
import { ArcaeaError } from './Error';

const songData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'song.json'), { encoding: 'utf-8' }));

export class ArcaeaMember {
    private requester: Request;

    /**
     * Create ArcaeaMember Instance
     */
    constructor(deviceId: string) {
        this.requester = new Request('https://arcapi.lowiro.com/coffee/12/', deviceId);
    }

    /**
     * Login into Arcaea
     * @param id
     * @param password
     */
    public async login(id: string, password: string): Promise<void> {
        this.requester.setAuthorization('Basic ' + base64encode(id + ':' + password));
        const result = await this.requester.post('auth/login');
        if (!!result.success) {
            this.requester.setAuthorization('Bearer ' + result.access_token);
            this.requester.deleteDeviceId();
            return;
        }
        throw new ArcaeaError('Can not login', result);
    }

    /**
     * Return Account Infomation
     */
    public async getInfo(): Promise<any> {
        const result = await this.requester.get('user/me', {});
        if (!!result.success) {
            return result.value;
        }
        throw new ArcaeaError('Can not get infomation', result);
    }

    /**
     * Add New Friend
     * @param friendCode
     */
    public async addFriend(friendCode: number): Promise<any> {
        const result = await this.requester.post('friend/me/add', 'friend_code=' + friendCode);
        if (!!result.success) {
            return result.value;
        }
        throw new ArcaeaError('Can not add friend', result);
    }

    /**
     * Delete Friend (Different arguments "addFriend")
     * @param friendId
     */
    public async delFriend(friendId: number): Promise<void> {
        const result = await this.requester.post('friend/me/delete', 'friend_id=' + friendId);
        if (!!result.success) {
            return;
        }
        throw new ArcaeaError('Can not delete friend', result);
    }

    /**
     * Get Friend Play Data (Different arguments "addFriend")
     * @param friendId
     */
    public async getFriendPlayData(friendId: number): Promise<any> {
        return await this.getPlayData('score/song/friend', friendId);
    }

    /**
     * Get My Play Data (Different arguments "addFriend")
     * @param friendId
     */
    public async getMyPlayData(): Promise<any> {
        return await this.getPlayData('score/song/me');
    }

    private async getPlayData(subUrl: string, userId?: number): Promise<any> {
        try {
            const songs = songData.songs;
            let result: any[] = [];
            await Promise.all(
                songs.map(async (song: any) => {
                    for (let difficulty = 0; difficulty <= 2; difficulty++) {
                        const playData = await this.requester.get(subUrl, {
                            song_id: song.id,
                            difficulty,
                            start: 0,
                            limit: 100,
                        });
                        await Promise.all(
                            playData.value.map(async (item: any) => {
                                if (!!userId && item.user_id !== userId) {
                                    return;
                                }
                                result.push({
                                    song_id: item.song_id,
                                    difficulty: item.difficulty,
                                    score: item.score,
                                    time_played: item.time_played,
                                    best_clear_type: item.best_clear_type, // 0이면 트랙 로스트, 1이면 그냥 클리어, 2이면 풀 리콜, 3이면 퓨어 메모리, 4면 이지게이지 클리어, 5면 하드클
                                });
                            })
                        );
                    }
                })
            );
            return result;
        } catch (err) {
            throw new ArcaeaError('Can not get play data');
        }
    }
}
