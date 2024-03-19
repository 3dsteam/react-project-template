import { Fragment } from "react";

interface IBreadcrumbProps {
    breadcrumbs: { label: string; path: string }[];
}

export default function Breadcrumb({ breadcrumbs }: IBreadcrumbProps) {
    return (
        <>
            {breadcrumbs.length > 0 && (
                <section className="admin-page-breadcrumb">
                    {breadcrumbs.map((breadcrumb, index) => (
                        <Fragment key={index}>
                            <a href={breadcrumb.path}>{breadcrumb.label}</a>
                            {index < breadcrumbs.length - 1 && <i className="fa-regular fa-slash-forward" />}
                        </Fragment>
                    ))}
                </section>
            )}
        </>
    );
}
