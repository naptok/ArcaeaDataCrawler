export declare class ArcaeaMember {
    private requester;
    constructor(deviceId: string);
    login(id: string, password: string): Promise<void>;
    getInfo(): Promise<any>;
    addFriend(friendCode: number): Promise<any>;
    delFriend(friendId: number): Promise<void>;
    getFriendPlayData(friendId: number): Promise<any>;
    getMyPlayData(): Promise<any>;
    private getPlayData;
}
