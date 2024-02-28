import Home from "./home";
import AuthRoutes from "@pages/auth-routes.tsx";
import GuestOnlyRoutes from "@pages/guest-only-routes.tsx";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import SignIn from "@pages/sign-in";

export default function Router() {
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <AuthRoutes path="/" exact Component={Home} />
                <GuestOnlyRoutes path="/sign-in" exact Component={SignIn} />
            </IonRouterOutlet>
        </IonReactRouter>
    );
}
