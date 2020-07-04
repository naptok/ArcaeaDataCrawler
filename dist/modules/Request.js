"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
var RequestType;
(function (RequestType) {
    RequestType["POST"] = "POST";
    RequestType["GET"] = "GET";
})(RequestType = exports.RequestType || (exports.RequestType = {}));
class Request {
    /**
     * Inject Arcaea API Address
     * @param address
     */
    constructor(address, deviceId) {
        this.headers = {
            Accept: '*/*',
            AppVersion: '3.0.0',
            DeviceId: 'undefined',
            'Accept-Language': 'ko-KR',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Accept-Encoding': 'br, gzip, deflate',
            'User-Agent': 'CFNetwork/976 Darwin/18.2.0',
        };
        this.address = address;
        this.headers.DeviceId = deviceId; // like "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
    }
    /**
     * Send Request
     * @param subUrl
     * @param method
     * @param qs
     */
    async send(subUrl, method, qs) {
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
                }
                else {
                    options['qs'] = qs;
                }
            }
            request_1.default(options, (err, _res, body) => {
                if (err) {
                    return reject(err);
                }
                return resolve(body);
            });
        });
    }
    setAuthorization(authorization) {
        this.headers.Authorization = authorization;
    }
    deleteDeviceId() {
        delete this.headers.DeviceId;
    }
    async post(subUrl, data) {
        return this.send(subUrl, RequestType.POST, data);
    }
    async get(subUrl, qs) {
        return this.send(subUrl, RequestType.GET, qs);
    }
}
exports.Request = Request;
//# sourceMappingURL=Request.js.map