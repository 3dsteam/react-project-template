import { IonApp } from "@ionic/react";
import Router from "@pages/router.tsx";

export default function App() {
    return (
        <IonApp data-testid="app">
            <Router />
        </IonApp>
    );
}
