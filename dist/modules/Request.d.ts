export declare enum RequestType {
    POST = "POST",
    GET = "GET"
}
export declare class Request {
    private address;
    private headers;
    /**
     * Inject Arcaea API Address
     * @param address
     */
    constructor(address: string, deviceId: string);
    /**
     * Send Request
     * @param subUrl
     * @param method
     * @param qs
     */
    private send;
    setAuthorization(authorization: string): void;
    deleteDeviceId(): void;
    post(subUrl: string, data?: any): Promise<any>;
    get(subUrl: string, qs: any): Promise<any>;
}
