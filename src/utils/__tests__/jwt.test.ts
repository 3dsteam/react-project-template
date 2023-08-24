import { vi } from "vitest";
import { sign } from "jsonwebtoken";
import { callbackOnJwtExpired, getJwtExp, isJwtExpired } from "@utils/jwt.ts";

describe("Utils: jwt", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("returns correct expiration date", () => {
        const token = generateJWT();
        expect(getJwtExp(token)).toBeGreaterThan(Date.now());
        vi.advanceTimersByTime(3600000);
        expect(getJwtExp(token)).toBeLessThan(Date.now());
    });

    it("returns true if token is expired", () => {
        const token = generateJWT();
        vi.advanceTimersByTime(3600000);
        expect(isJwtExpired(token)).toBe(true);
    });

    it("returns false if token is not expired", () => {
        const token = generateJWT();
        expect(isJwtExpired(token)).toBe(false);
    });

    it("callbacks when token is expired", () => {
        const token = generateJWT();
        const callback = vi.fn();
        // Define callback
        callbackOnJwtExpired(token, callback);
        expect(callback).not.toHaveBeenCalled();

        vi.advanceTimersByTime(3600000);
        expect(callback).toHaveBeenCalled();
    });
});

export const generateJWT = (): string => {
    const secretKey = "secret-key";
    // Get JWT
    return sign({}, secretKey, { expiresIn: "1h" });
};
