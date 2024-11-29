interface IAPIError {
    requestId: string;
    code: string;
    detail: string;
    message: string;
}

export type { IAPIError };
