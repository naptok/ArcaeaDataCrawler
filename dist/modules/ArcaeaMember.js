"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("./Request");
const base64_1 = require("./base64");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Error_1 = require("./Error");
const songData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'song.json'), { encoding: 'utf-8' }));
class ArcaeaMember {
    constructor(deviceId) {
        this.requester = new Request_1.Request('https://arcapi.lowiro.com/coffee/12/', deviceId);
    }
    async login(id, password) {
        this.requester.setAuthorization('Basic ' + base64_1.base64encode(id + ':' + password));
        const result = await this.requester.post('auth/login');
        if (!!result.success) {
            this.requester.setAuthorization('Bearer ' + result.access_token);
            this.requester.deleteDeviceId();
            return;
        }
        throw new Error_1.ArcaeaError('Can not login', result);
    }
    async getInfo() {
        const result = await this.requester.get('user/me', {});
        if (!!result.success) {
            return result.value;
        }
        throw new Error_1.ArcaeaError('Can not get infomation', result);
    }
    async addFriend(friendCode) {
        const result = await this.requester.post('friend/me/add', 'friend_code=' + friendCode);
        if (!!result.success) {
            return result.value;
        }
        throw new Error_1.ArcaeaError('Can not add friend', result);
    }
    async delFriend(friendId) {
        const result = await this.requester.post('friend/me/delete', 'friend_id=' + friendId);
        if (!!result.success) {
            return;
        }
        throw new Error_1.ArcaeaError('Can not delete friend', result);
    }
    async getFriendPlayData(friendId) {
        return await this.getPlayData('score/song/friend', friendId);
    }
    async getMyPlayData() {
        return await this.getPlayData('score/song/me');
    }
    async getPlayData(subUrl, userId) {
        try {
            const songs = songData.songs;
            let result = [];
            await Promise.all(songs.map(async (song) => {
                for (let difficulty = 0; difficulty <= 2; difficulty++) {
                    const playData = await this.requester.get(subUrl, {
                        song_id: song.id,
                        difficulty,
                        start: 0,
                        limit: 100,
                    });
                    await Promise.all(playData.value.map(async (item) => {
                        if (!!userId && item.user_id !== userId) {
                            return;
                        }
                        result.push({
                            song_id: item.song_id,
                            difficulty: item.difficulty,
                            score: item.score,
                            time_played: item.time_played,
                            best_clear_type: item.best_clear_type,
                        });
                    }));
                }
            }));
            return result;
        }
        catch (err) {
            throw new Error_1.ArcaeaError('Can not get play data');
        }
    }
}
exports.ArcaeaMember = ArcaeaMember;
//# sourceMappingURL=ArcaeaMember.js.map