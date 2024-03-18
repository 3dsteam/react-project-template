import { ChangedEventArgs, FormValidator, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    identificationType?: "email" | "username";
    onSubmit: (data: Record<string, string>) => Promise<void>;
}

export default function SignInForm(props: Props) {
    const { t } = useTranslation();
    const validator = useRef<FormValidator>();

    // Form data
    const [identification, setIdentification] = useState("");
    const [password, setPassword] = useState("");

    // Password type
    const [passwordType, setPasswordType] = useState<"password" | "text">("password");

    /**
     * Set the form validator
     * @param element {HTMLFormElement} Form element
     */
    const setFormValidator = (element: HTMLFormElement) => {
        validator.current = new FormValidator(`#${element.id}`, {
            rules: {
                identification: { required: true },
                password: { required: true },
            },
        });
    };

    /**
     * Handle form submit
     * @param e {FormEvent<HTMLFormElement>}
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Check if form is valid
        if (validator.current?.validate()) {
            // Callback
            await props.onSubmit({ identification, password });
        }
    };

    return (
        <form
            id="sign-in-form"
            data-testid="sign-in-form"
            ref={(el) => {
                if (!el) return;
                // Set form validator
                setFormValidator(el);
            }}
            onSubmit={(e) => void handleSubmit(e)}
        >
            <div>
                <TextBoxComponent
                    name="identification"
                    data-testid="identification-input"
                    type={props.identificationType === "email" ? "email" : "text"}
                    value={identification}
                    placeholder={t(props.identificationType === "email" ? "Email address" : "Username")}
                    floatLabelType="Auto"
                    change={(args: ChangedEventArgs) => setIdentification(args.value ?? "")}
                    data-msg-containerid="identification-error"
                />
                {/* Error message */}
                <p id="identification-error" data-testid="identification-error" />
            </div>
            <div>
                <div className="e-input-group">
                    <TextBoxComponent
                        name="password"
                        data-testid="password-input"
                        type={passwordType}
                        value={password}
                        placeholder="Password"
                        floatLabelType="Auto"
                        change={(args: ChangedEventArgs) => setPassword(args.value ?? "")}
                        data-msg-containerid="password-error"
                    />
                    <span
                        data-testid="password-eye"
                        className="e-input-group-icon fa-regular fa-eye"
                        onMouseDown={() => setPasswordType("text")}
                        onMouseUp={() => setPasswordType("password")}
                    />
                </div>
                {/* Error message */}
                <p id="password-error" data-testid="password-error" />
            </div>
            {/* Submit button */}
            <ButtonComponent data-testid="btn-submit" isPrimary content={t("Sign in")} className="w-full" />
        </form>
    );
}
