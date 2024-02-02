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
        // @TODO: Parse token and user from data
        const token = (data as { token: string }).token;
        const user = (data as { user: Record<string, string> }).user;
        // Authenticate user
        dispatch(authenticate({ token, user }));
    }, [data, dispatch]);

    const handleOnSubmit = async (data: Record<string, string>) => {
        await signInMutation(data);
    };

    return (
        <div data-testid="sign-in">
            <img src={Logo} alt="Logo" />
            {/* Form */}
            <SignInForm onSubmit={handleOnSubmit} />
            {/* Error message */}
            {error && "data" in error && <div data-testid="error-message">{(error.data as IAPIError).message}</div>}
        </div>
    );
}
