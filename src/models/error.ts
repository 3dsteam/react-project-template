export interface IGenericError {
    /**
     * The error code of the error.
     * This is used to identify the error type.
     * @example "BAD_REQUEST"
     */
    code: string;
    /**
     * The error message of the error.
     * This is used to provide a user-friendly message about the error.
     * @example "The provided filter is not valid"
     */
    message: string;
}

export interface IApiError extends IGenericError {
    /**
     * The request ID of the error.
     * This is used to track the request in the logs.
     * @example "REQ_018dc6e6460b7b9abb3097435a64e041"
     */
    requestId: string;
    /**
     * The error detail of the error.
     * This is used to provide more information about the error.
     * @example "'and' condition requires at least one rule"
     */
    detail: string;
    /**
     * The error status of the error.
     * This is used to identify the HTTP status code of the error.
     * @example 400
     */
    status: number;
}

export const ApiError = {
    create: (error?: Partial<IApiError>): IApiError => {
        return {
            code: error?.code ?? "UNKNOWN_ERROR",
            message: error?.message ?? "An unknown error occurred",
            requestId: error?.requestId ?? "N/D",
            detail: error?.detail ?? "N/D",
            status: error?.status ?? 500,
        };
    },
};
