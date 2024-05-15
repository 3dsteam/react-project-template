import SidebarPanel from "@components/sidebar-panel/sidebar-panel.tsx";
import { useRef, useState } from "react";
import { Edit, GridComponent, Inject, Page } from "@syncfusion/ej2-react-grids";
import { AppBarComponent } from "@syncfusion/ej2-react-navigations";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

export default function AdminExample() {
    const grid = useRef<GridComponent | null>(null);

    const [toggle, setToggle] = useState(false);

    return (
        <main id="admin-page" data-testid="admin-example" className="page main-padding">
            {/* Sidebar */}
            <SidebarPanel target="#admin-page" isOpen={toggle} onClose={() => setToggle(false)}>
                <div className="h-full bg-white border">
                    {/* Header */}
                    <AppBarComponent colorMode="Primary">
                        <span>Filters</span>
                        <span className="e-appbar-spacer" />
                        <ButtonComponent
                            iconCss="fa-regular fa-xmark"
                            className="e-inherit"
                            onClick={() => setToggle(false)}
                        />
                    </AppBarComponent>
                    {/* Content */}
                    <div className="main-padding">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim est magni nisi odit quam ratione
                        sapiente, voluptate! Architecto, soluta, voluptates! Aspernatur assumenda dolore eaque excepturi
                        fuga modi omnis quam repellat?
                    </div>
                </div>
            </SidebarPanel>
            {/* Container */}
            <section className="vertical-layout main-space-y">
                {/* Header */}
                <header className="page-header">
                    <div>
                        <h1 className="title">
                            <i className="fa-regular fa-cog" /> Admin (Example)
                        </h1>
                        <p className="subtitle">Lorem ipsum dolor sit amet</p>
                    </div>
                    {/* Actions */}
                    <div className="space-x-2">
                        <ButtonComponent
                            iconCss="fa-regular fa-plus"
                            content="Add"
                            onClick={() => {
                                grid.current?.addRecord();
                            }}
                        />
                        <ButtonComponent
                            isPrimary
                            iconCss="fa-regular fa-filter"
                            content="Filters"
                            onClick={() => setToggle(!toggle)}
                        />
                    </div>
                </header>
                {/* Content */}
                <div className="page-content">
                    <GridComponent
                        ref={grid}
                        height="100%"
                        columns={[
                            { field: "id", headerText: "ID", isPrimaryKey: true, width: 100, allowEditing: false },
                            { field: "name", headerText: "Name", width: 100 },
                            { field: "role", headerText: "Role", width: 100 },
                            { field: "status", headerText: "Status", width: 100 },
                        ]}
                        dataSource={[
                            { id: 1, name: "John Doe", role: "Admin", status: "Active" },
                            { id: 2, name: "Jane Doe", role: "User", status: "Inactive" },
                            { id: 3, name: "John Smith", role: "User", status: "Active" },
                        ]}
                        // Pagination
                        allowPaging
                        pageSettings={{ pageSize: 50, pageCount: 5 }}
                        // Editing
                        editSettings={{
                            allowAdding: true,
                            allowEditing: true,
                            allowDeleting: true,
                            showDeleteConfirmDialog: true,
                            mode: "Dialog",
                        }}
                    >
                        <Inject services={[Page, Edit]} />
                    </GridComponent>
                </div>
            </section>
        </main>
    );
}
