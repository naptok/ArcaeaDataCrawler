"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArcaeaError extends Error {
    constructor(reason, message) {
        super();
        this.name = reason;
        if (!!message) {
            this.message = message;
        }
    }
}
exports.ArcaeaError = ArcaeaError;
//# sourceMappingURL=Error.js.map