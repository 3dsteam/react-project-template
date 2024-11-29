import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import DynamicForm, { EFieldType } from "@3dsteam/react-dynamic-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { postSignIn } from "../queries/post.sign-in.ts";
import { useEffect } from "react";
import useAuthStore from "../store/auth.tsx";

export const Route = createFileRoute("/sign-in")({
    component: RouteComponent,
    /**
     * Check if the user is authenticated
     * If so, redirect to the home page
     */
    beforeLoad: () => {
        if (useAuthStore.getState().isAuth()) {
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            throw redirect({
                to: "/",
            });
        }
    },
});

function RouteComponent() {
    const { t } = useTranslation();
    const router = useRouter();
    const authenticate = useAuthStore((state) => state.authenticate);

    const { mutateAsync, data, isSuccess } = useMutation({
        mutationKey: ["SignIn"],
        mutationFn: postSignIn,
    });

    const handleSubmit = async (values: Record<string, unknown>) => {
        await mutateAsync({ username: values.username as string, password: values.password as string });
    };

    useEffect(() => {
        if (!isSuccess || !data) return;
        // Set session
        authenticate({
            ...data,
            user: { ...data.user, nominative: (data.user.nominative as string) ?? "Unknown" },
        });
        // Invalidate the router
        void router.invalidate();
    }, [data]);

    return (
        <div id="sign-in" data-testid="sign-in" className="grid place-content-center w-full h-full bg-violet-200">
            <div className="w-96 h-fit bg-white rounded-lg shadow-lg px-8 py-16 space-y-8">
                <h1 className="text-4xl text-center font-bold">{t("SignIn.Sign in")}</h1>
                <p className="text-center text-sm text-gray-500">
                    {t("SignIn.Welcome to {{name}}", { name: "Lorem Ipsum" })}
                </p>
                <DynamicForm
                    fields={[
                        {
                            name: "username",
                            placeholder: "Username",
                            validations: { required: true },
                            props: { floatLabelType: "Always" },
                        },
                        {
                            name: "password",
                            type: EFieldType.PASSWORD,
                            placeholder: "Password",
                            validations: { required: true },
                            props: { floatLabelType: "Always" },
                        },
                    ]}
                    onSubmit={handleSubmit}
                    buttons={{
                        btnSubmitText: t("SignIn.Sign in"),
                        btnSubmitProps: { iconCss: "fa-light fa-right-to-bracket", cssClass: "w-full h-10 mt-4" },
                    }}
                    className="space-y-2"
                />
            </div>
        </div>
    );
}
