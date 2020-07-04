import request from 'request';

export enum RequestType {
    POST = 'POST',
    GET = 'GET',
}

export class Request {
    private address: string;
    private headers: any = {
        Accept: '*/*',
        AppVersion: '3.0.0',
        DeviceId: 'undefined',
        'Accept-Language': 'ko-KR',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accept-Encoding': 'br, gzip, deflate',
        'User-Agent': 'CFNetwork/976 Darwin/18.2.0',
    };

    /**
     * Inject Arcaea API Address
     * @param address
     */
    constructor(address: string, deviceId: string) {
        this.address = address;
        this.headers.DeviceId = deviceId; // like "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
    }

    /**
     * Send Request
     * @param subUrl
     * @param method
     * @param qs
     */
    private async send(subUrl: string, method: string, qs: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let options = {
                uri: this.address + subUrl,
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

    public setAuthorization(authorization: string) {
        this.headers.Authorization = authorization;
    }

    public deleteDeviceId() {
        delete this.headers.DeviceId;
    }

    public async post(subUrl: string, data?: any): Promise<any> {
        return this.send(subUrl, RequestType.POST, data);
    }

    public async get(subUrl: string, qs: any): Promise<any> {
        return this.send(subUrl, RequestType.GET, qs);
    }
}
