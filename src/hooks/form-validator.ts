import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

interface IRule extends IRuleOptions {
    key: string;
}

interface IRuleOptions {
    // Options
    required?: boolean | IRuleMessage<boolean>;
    // Type options
    isEmail?: IRuleMessage<boolean>;
    isURL?: IRuleMessage<boolean>;
    // isDate?: boolean | IRuleMessage<boolean>;
    // String options
    minLength?: IRuleMessage<number>;
    maxLength?: IRuleMessage<number>;
    pattern?: IRuleMessage<RegExp>;
    // Number options
    min?: IRuleMessage<number>;
    max?: IRuleMessage<number>;
    // Date options
    ltDate?: IRuleMessage<string | Date>;
    lteDate?: IRuleMessage<string | Date>;
    gtDate?: IRuleMessage<string | Date>;
    gteDate?: IRuleMessage<string | Date>;
}

interface IRuleMessage<T> {
    value: T;
    message?: string;
}

interface IUserValidatorProps {
    data?: Record<string, unknown>;
    rules?: Record<string, true | IRuleOptions>;
    // Options
    options?: {
        translation?: {
            prefix?: string | null;
        };
    };
}

// Regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const urlRegex = /^(http|https):\/\/[^ "]+$/;

export const useValidator = (props?: IUserValidatorProps) => {
    const { t } = useTranslation();
    const rules = useRef<IRule[]>([]);

    // State
    const [errors, setErrors] = useState<Record<string, string>>({});

    /**
     * Update rules
     * @param options
     */
    const updateRules = (options: Record<string, true | IRuleOptions>) => {
        const _rules: IRule[] = [];
        // Each options
        for (const key in options) {
            // Check if key is fast required (boolean)
            if (typeof options[key] === "boolean") {
                _rules.push({ key, required: true });
            } else {
                _rules.push({ key, ...(options[key] as IRuleOptions) });
            }
        }
        // Update rules
        rules.current = _rules;
    };

    // Init
    useEffect(() => {
        // Update rules
        updateRules(props?.rules ?? {});
    }, [props?.rules]);

    // Flag to check if validate function is called at least once
    // This is used for live validation after first submit
    const flagValidated = useRef(false);
    const dataRef = useRef<Record<string, unknown>>(props?.data ?? {});

    const getTranslation = useCallback(
        (key: string, values?: Record<string, unknown>) => {
            const prefix = props?.options?.translation?.prefix;
            if (prefix === null) return t(key, values);
            else if (prefix === undefined) return t(`Validation.${key}`, values);
            return t(`${prefix}.${key}`, values);
        },
        [t, props?.options?.translation?.prefix],
    );

    /**
     * Validate data
     * @param data {Record<string, unknown>}
     */
    const validate = useCallback(
        (data: Record<string, unknown>) => {
            flagValidated.current = true;
            const errors: Record<string, string> = {};
            // Check if empty rules
            if (rules.current.length === 0) {
                console.warn("[Form Validator] No rules defined");
                // Clear errors
                setErrors(errors);
                return true;
            }
            // Each rules
            for (const rule of rules.current) {
                const key = rule.key;
                // Get value from data
                const value = data[key];

                // Validate data
                if (rule.required && !value) {
                    let message = getTranslation("This field is required");
                    if (typeof rule.required === "object" && rule.required.message) message = rule.required.message;
                    errors[key] = message;
                }
                // Check if email
                else if (value && rule.isEmail?.value && !emailRegex.test(value as string)) {
                    errors[key] = rule.isEmail.message ?? getTranslation("Invalid email address");
                }
                // Check if URL
                else if (value && rule.isURL?.value && !urlRegex.test(value as string)) {
                    errors[key] = rule.isURL.message ?? getTranslation("Invalid URL");
                }
                // Check if string is too short
                else if (value && rule.minLength && (value as string).length < rule.minLength.value) {
                    errors[key] =
                        rule.minLength.message ??
                        getTranslation("Minimum length is {{value}}", { value: rule.minLength.value });
                }
                // Check if string is too long
                else if (value && rule.maxLength && (value as string).length > rule.maxLength.value) {
                    errors[key] =
                        rule.maxLength.message ??
                        getTranslation("Maximum length is {{value}}", { value: rule.maxLength.value });
                }
                // Check if pattern is matched
                else if (value && rule.pattern && !rule.pattern.value.test(value as string)) {
                    errors[key] = rule.pattern.message ?? "Invalid value";
                }
                // Check if number is too small
                else if (value && rule.min && (value as number) < rule.min.value) {
                    errors[key] = rule.min.message ?? `Minimum value is ${rule.min.value}`;
                }
                // Check if number is too big
                else if (value && rule.max && (value as number) > rule.max.value) {
                    errors[key] = rule.max.message ?? `Maximum value is ${rule.max.value}`;
                }
                // Check if date is before
                else if (value && rule.ltDate && !moment(value).isBefore(rule.ltDate.value)) {
                    let message = `Date must be before ${moment(rule.ltDate.value).format()}`;
                    if (rule.ltDate.message) message = rule.ltDate.message;
                    errors[key] = message;
                }
                // Check if date is on or before
                else if (value && rule.lteDate && !moment(value).isSameOrBefore(rule.lteDate.value)) {
                    let message = `Date must be on or before ${moment(rule.lteDate.value).format()}`;
                    if (rule.lteDate.message) message = rule.lteDate.message;
                    errors[key] = message;
                }
                // Check if date is after
                else if (value && rule.gtDate && !moment(value).isAfter(rule.gtDate.value)) {
                    let message = `Date must be after ${moment(rule.gtDate.value).format()}`;
                    if (rule.gtDate.message) message = rule.gtDate.message;
                    errors[key] = message;
                }
                // Check if date is on or after
                else if (value && rule.gteDate && !moment(value).isSameOrAfter(rule.gteDate.value)) {
                    let message = `Date must be on or after ${moment(rule.gteDate.value).format()}`;
                    if (rule.gteDate.message) message = rule.gteDate.message;
                    errors[key] = message;
                }
            }
            // Set errors
            setErrors(errors);
            return Object.keys(errors).length === 0;
        },
        [getTranslation],
    );

    // Check if form is valid
    const isValid = useMemo(() => flagValidated.current && Object.keys(errors).length === 0, [errors]);

    // Live validation
    useEffect(() => {
        if (!flagValidated.current || !props?.data) return;
        // Check if data is changed
        if (JSON.stringify(dataRef.current) === JSON.stringify(props.data)) return;
        // Validate current data
        dataRef.current = props.data;
        validate(props.data);
    }, [props?.data, validate]);

    return { updateRules, validate, isValid, errors };
};
