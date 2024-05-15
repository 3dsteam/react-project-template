import Router from "@pages/router.tsx";

export default function App() {
    return (
        <div data-testid="app" className="w-screen h-screen overflow-y-auto">
            <Router />
        </div>
    );
}
