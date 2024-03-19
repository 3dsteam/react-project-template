import { useMemo, useState } from "react";
import Breadcrumb from "@pages/admin/ui/breadcrumb.tsx";

export default function Admin() {
    const [showSidebar, setShowSidebar] = useState(false);

    // Breadcrumbs
    const breadcrumbs = useMemo(
        () => [
            { label: "Home", path: "/" },
            { label: "Admin", path: "/admin" },
        ],
        [],
    );

    return (
        <div data-testid="admin-page" className="admin-page">
            {/* Header */}
            <section className="admin-page-header">
                {/* Title */}
                <section className="admin-page-title">
                    <h1 className="text-xl text-primary font-bold">Admin</h1>
                    <p className="text-sm text-gray-500">Lorem ipsum dolor si amet</p>
                    {/* Breadcrumb */}
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </section>
                {/* Actions */}
                <section>
                    <button data-testid="btn-detail-panel" onClick={() => setShowSidebar(!showSidebar)}>
                        Toggle sidebar
                    </button>
                </section>
            </section>
            {/* Container */}
            <section className="admin-page-container">
                {/* Content */}
                <section className="admin-page-content" />
                {/* Sidebar */}
                {showSidebar && <section data-testid="detail-panel" />}
            </section>
        </div>
    );
}
