import Logo from "@assets/logo.svg";
import SignInForm from "@components/sign-in-form";
import { useSignInMutation } from "@store/services/queries/sign-in.ts";
import { useEffect } from "react";
import { useAppDispatch } from "@store/hooks.ts";
import { authenticate } from "@store/reducers/auth.ts";
import { IAPIError } from "@models/error.ts";

export default function SignIn() {
    const dispatch = useAppDispatch();
    const [signInMutation, { data, error }] = useSignInMutation();

    useEffect(() => {
        if (!data) return;
        // Authenticate user
        dispatch(authenticate(data));
    }, [data, dispatch]);

    const handleOnSubmit = async (data: Record<string, string>) => {
        await signInMutation(data);
    };

    return (
        <div data-testid="sign-in" className="flex justify-center items-center flex-row w-screen h-screen bg-primary">
            <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
                <img src={Logo} alt="Logo" className="object-contain w-24 mx-auto" />
                {/* Form */}
                <section className="space-y-2">
                    <h1 className="text-2xl">Sign in</h1>
                    <SignInForm onSubmit={handleOnSubmit} />
                    {/* Error message */}
                    {error && "data" in error && (
                        <div data-testid="error-message">{(error.data as IAPIError).message}</div>
                    )}
                </section>
            </div>
        </div>
    );
}
