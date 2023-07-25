import axios from "axios";

const axiosInstance = axios.create({
    baseURL: (import.meta.env.VITE_REST_BASE_URL as string) || "/",
    timeout: (import.meta.env.VITE_API_TIMEOUT as number) || 30000,
});

abstract class Rest {
    /**
     * Set axios headers
     * @param headers
     */
    static setHeaders = (headers: Record<string, string>) => {
        axiosInstance.defaults.headers.common = { ...axiosInstance.defaults.headers.common, ...headers };
    };

    /**
     * Declare here your static functions that will be used to call your REST API
     * Example:
     * static whoAmI = () => {
     *    return "I am a static function";
     *  };
     */

    /**
     * Test static function
     * Important: this function is only for testing purposes. If you don't need it, remove it and the test case.
     * @param data
     */
    static __testStaticFn = async (data?: unknown) => {
        return await axiosInstance.post("/test", data);
    };
}

export default Rest;
export { axiosInstance };
