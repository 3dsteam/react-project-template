import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useValidator } from "@hooks/form-validator.ts";

interface Props {
    identificationType?: "email" | "username";
    onSubmit: (data: Record<string, string>) => Promise<void>;
}

export default function SignInForm(props: Props) {
    const { t } = useTranslation("translation", { keyPrefix: "SignIn" });

    // Form data
    const [identification, setIdentification] = useState("");
    const [password, setPassword] = useState("");

    // Form validation
    const { validate, errors } = useValidator({
        data: { identification, password },
        rules: {
            identification: {
                required: true,
                isEmail: { value: props.identificationType === "email" },
            },
            password: true,
        },
    });

    // Identification and password type
    const isEmail = props.identificationType === "email";
    const [passwordType, setPasswordType] = useState<"password" | "text">("password");

    /**
     * Handle form submit
     * @param e {FormEvent<HTMLFormElement>}
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Check if form is valid
        if (validate({ identification, password })) {
            await props.onSubmit({ identification, password });
        }
    };

    return (
        <form data-testid="sign-in-form" onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
            <section>
                <label htmlFor="identification">{t(isEmail ? "Email address" : "Username")}</label>
                <input
                    name="identification"
                    data-testid="identification-input"
                    type={isEmail ? "email" : "text"}
                    value={identification}
                    placeholder={t(`Enter your ${isEmail ? "email" : "username"}`)}
                    onChange={(e) => setIdentification(e.target.value)}
                    className="e-input"
                />
                {/* Error message */}
                <p data-testid="identification-error" className="text-red-500">
                    {errors.identification}
                </p>
            </section>
            <section>
                <label htmlFor="password">Password</label>
                <div className="e-input-group">
                    <input
                        name="password"
                        data-testid="password-input"
                        type={passwordType}
                        value={password}
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                        className="e-input"
                    />
                    {/* Password eye icon */}
                    <span
                        data-testid="password-eye"
                        className="e-input-group-icon fa-regular fa-eye"
                        onMouseDown={() => setPasswordType("text")}
                        onMouseUp={() => setPasswordType("password")}
                    />
                </div>
                {/* Error message */}
                <p data-testid="password-error" className="text-red-500">
                    {errors.password}
                </p>
            </section>
            {/* Submit button */}
            <ButtonComponent data-testid="btn-submit" isPrimary content={t("Sign in")} className="w-full" />
        </form>
    );
}
