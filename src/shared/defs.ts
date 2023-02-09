export class ResponseError extends Error {
    status: number;
    message: string;
    error?: Error;

    constructor(status: number, message: string, error?: Error) {
        super();
        this.status = status;
        this.message = message;
        this.error = error;
    }
}
