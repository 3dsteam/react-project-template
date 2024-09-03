import Logo from "@assets/logo.svg";
import { useSignInMutation } from "@store/services/queries/sign-in.ts";
import { useEffect } from "react";
import { useAppDispatch } from "@store/hooks.ts";
import { authenticate } from "@store/reducers/auth.ts";
import { IAPIError } from "@models/error.ts";
import DynamicForm, { EFieldType } from "@3dsteam/react-dynamic-form";

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
        <div data-testid="sign-in" className="flex justify-end h-screen bg-primary">
            <div className="basis-1/3 bg-white py-24 px-16 space-y-8">
                {/* Logo */}
                <img src={Logo} alt="Logo" className="object-contain h-40" />
                {/* Form */}
                <h1 className="text-2xl font-bold">Sign in</h1>
                <DynamicForm
                    fields={[
                        {
                            name: "identification",
                            type: EFieldType.EMAIL,
                            placeholder: "Identification",
                            validations: { required: true, isEmail: true },
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
                    buttons={{
                        btnSubmitText: "Sign in",
                        btnSubmitProps: { className: "w-full" },
                    }}
                    onSubmit={(data) => handleOnSubmit(data as Record<string, string>)}
                    className="space-y-2"
                />
                {/* Error message */}
                {error && "data" in error && <div data-testid="error-message">{(error.data as IAPIError).message}</div>}
            </div>
        </div>
    );
}
