import Rest, { axiosInstance } from "../rest.ts";
import MockAdapter from "axios-mock-adapter";
import { waitFor } from "@testing-library/react";

describe("Rest API", () => {
    it("default export should be an axios instance", () => {
        expect(axiosInstance).toBeDefined();
        expect(axiosInstance).toBeInstanceOf(Object);
    });

    it("should have a setAxiosHeaders function", () => {
        Rest.setHeaders({ Authorization: "Bearer TOKEN", "Content-Type": "application/json" });
        expect(axiosInstance.defaults.headers.common).toEqual(
            expect.objectContaining({
                Authorization: "Bearer TOKEN",
                "Content-Type": "application/json",
            }),
        );
    });

    it("exports static Rest class with rest API calls", async () => {
        const mock = new MockAdapter(axiosInstance);
        mock.onPost("/test").reply(200, { data: "Done!" });
        const res = await waitFor(() => Rest.__testStaticFn({ test: "Lorem ipsum" }));
        expect(res.data).toEqual({ data: "Done!" });
    });
});
