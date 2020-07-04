export declare class ArcaeaMember {
    private requester;
    /**
     * Create ArcaeaMember Instance
     */
    constructor(deviceId: string);
    /**
     * Login into Arcaea
     * @param id
     * @param password
     */
    login(id: string, password: string): Promise<void>;
    /**
     * Return Account Infomation
     */
    getInfo(): Promise<any>;
    /**
     * Add New Friend
     * @param friendCode
     */
    addFriend(friendCode: number): Promise<any>;
    /**
     * Delete Friend (Different arguments "addFriend")
     * @param friendId
     */
    delFriend(friendId: number): Promise<void>;
    /**
     * Get Friend Play Data (Different arguments "addFriend")
     * @param friendId
     */
    getFriendPlayData(friendId: number): Promise<any>;
    /**
     * Get My Play Data (Different arguments "addFriend")
     * @param friendId
     */
    getMyPlayData(): Promise<any>;
    private getPlayData;
}
