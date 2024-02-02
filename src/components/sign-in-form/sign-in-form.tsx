interface Props {
    onSubmit: (data: Record<string, string>) => Promise<void>;
}

export default function SignInForm(props: Props) {
    console.log("Sign in form", { props });
    return <div data-testid="sign-in-form" />;
}
