export const getJwtExp = (token: string): number => {
    const jwtObjects = token.split(".");
    if (jwtObjects.length === 0) return 0;
    const decoded = window.atob(jwtObjects[1]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return JSON.parse(decoded).exp * 1000;
};

export const isJwtExpired = (token: string): boolean => {
    return Date.now() >= getJwtExp(token);
};

export const callbackOnJwtExpired = (token: string, callback: () => void) => {
    // Check if token is expired
    if (isJwtExpired(token)) {
        callback();
        return -1;
    }
    // Get expiration time
    const time = getJwtExp(token) - Date.now();
    return setTimeout(callback, time < 2147483647 ? time : 2147483647);
};
