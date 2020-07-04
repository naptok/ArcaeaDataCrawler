"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function base64encode(text) {
    const base64 = Buffer.from(text).toString('base64');
    const utf8 = Buffer.from(base64).toString('utf-8');
    return utf8;
}
exports.base64encode = base64encode;
//# sourceMappingURL=base64.js.map