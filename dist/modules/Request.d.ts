export declare enum RequestType {
    POST = "POST",
    GET = "GET"
}
export declare class Request {
    private address;
    private headers;
    constructor(address: string, deviceId: string);
    private send;
    setAuthorization(authorization: string): void;
    deleteDeviceId(): void;
    post(subUrl: string, data?: any): Promise<any>;
    get(subUrl: string, qs: any): Promise<any>;
}
