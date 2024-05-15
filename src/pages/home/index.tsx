export default function Home() {
    return (
        <main data-testid="home" className="page main-padding">
            {/* Header */}
            <header className="page-header">
                <div>
                    <h1 className="title">
                        <i className="fa-regular fa-house" /> Home
                    </h1>
                    <p className="subtitle">Welcome to the home page!</p>
                </div>
            </header>
        </main>
    );
}
