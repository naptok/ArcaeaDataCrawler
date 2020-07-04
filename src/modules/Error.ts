export class ArcaeaError extends Error {
    constructor(reason: string, message?: string) {
        super();
        this.name = reason;
        if (!!message) {
            this.message = message;
        }
    }
}
