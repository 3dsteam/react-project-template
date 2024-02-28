import { IonContent, IonPage } from "@ionic/react";

export default function Home() {
    return (
        <IonPage data-testid="home">
            <IonContent forceOverscroll={false}>Hello React!</IonContent>
        </IonPage>
    );
}
