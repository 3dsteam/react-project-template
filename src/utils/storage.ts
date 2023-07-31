import { name } from "../../package.json";

export const getLocalStorage = (key: string, isObject?: boolean) => {
    const local = localStorage.getItem(name + "-" + key);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (local) return isObject ? JSON.parse(local) : local;
    return null;
};

export const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(name + "-" + key, value);
};

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(name + "-" + key);
};

export const getSessionStorage = (key: string, isObject?: boolean) => {
    const local = sessionStorage.getItem(name + "-" + key);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (local) return isObject ? JSON.parse(local) : local;
    return null;
};

export const setSessionStorage = (key: string, value: string) => {
    sessionStorage.setItem(name + "-" + key, value);
};

export const removeSessionStorage = (key: string) => {
    sessionStorage.removeItem(name + "-" + key);
};
