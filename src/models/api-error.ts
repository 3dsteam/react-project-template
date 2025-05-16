export interface IApiError {
    /**
     * The request ID of the error.
     * This is used to track the request in the logs.
     * @example "REQ_018dc6e6460b7b9abb3097435a64e041"
     */
    requestId?: string;
    /**
     * The error code of the error.
     * This is used to identify the error type.
     * @example "BAD_REQUEST"
     */
    code: string;
    /**
     * The error detail of the error.
     * This is used to provide more information about the error.
     * @example "'and' condition requires at least one rule"
     */
    detail?: string;
    /**
     * The error message of the error.
     * This is used to provide a user-friendly message about the error.
     * @example "The provided filter is not valid"
     */
    message: string;
    /**
     * The error status of the error.
     * This is used to identify the HTTP status code of the error.
     * @example 400
     */
    status: number;
}

/**
 * The ApiError class is used to represent an error returned by the API.
 * It extends the built-in Error class and adds additional properties
 * to provide more information about the error.
 */
export class ApiError extends Error implements IApiError {
    requestId?: string;
    code: string;
    detail?: string;
    message: string;
    status: number;

    constructor(error: IApiError) {
        super(error.message);
        this.requestId = error.requestId;
        this.code = error.code;
        this.detail = error.detail;
        this.message = error.message;
        this.status = error.status;
    }
}
