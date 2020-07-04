"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * string을 받으면 base64 형식으로 변환 한 후, 한번 더 utf-8 변환한 뒤 반환합니다.
 * @param text
 */
function base64encode(text) {
    const base64 = Buffer.from(text).toString('base64');
    const utf8 = Buffer.from(base64).toString('utf-8');
    return utf8;
}
exports.base64encode = base64encode;
//# sourceMappingURL=base64.js.map