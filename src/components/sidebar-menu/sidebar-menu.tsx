import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import ItemMenu, { IItemMenuProps as IItemMenu } from "@components/sidebar-menu/item-menu.tsx";
import Logo from "@assets/logo.svg";
import useAuthStore from "../../store/auth.tsx";
import { Link, useLocation } from "@tanstack/react-router";
import itemMenuStyle from "@components/sidebar-menu/item-menu.module.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DialogUtility } from "@syncfusion/ej2-react-popups";

interface ISidebarMenuProps {
    items: Omit<IItemMenu, "isActive">[];
}

const SidebarMenu = (props: ISidebarMenuProps) => {
    const { t } = useTranslation();
    const nominative = useAuthStore((state) => state.user?.nominative);
    const signOut = useAuthStore((state) => state.expire);
    const location = useLocation();

    const [toggle, setToggle] = useState<boolean>(false);

    const handleSignOut = () => {
        const dialog = DialogUtility.confirm({
            title: t("Sign out"),
            content: t("Are you sure you want to sign out?"),
            okButton: { text: t("Stay") },
            cancelButton: {
                text: t("Sign out"),
                click: () => {
                    signOut();
                    dialog.hide();
                },
            },
        });
    };

    return (
        <SidebarComponent enableDock dockSize="72px" width="280px" onClick={() => toggle && setToggle(false)}>
            <div className="relative w-full h-full p-4 space-y-12 bg-violet-200 text-gray-600">
                {/* Logo */}
                <Link to="/">
                    <img src={Logo} alt="Logo" className="w-12 h-12" />
                </Link>
                {/* Menu */}
                <ul className="space-y-2">
                    {/* Items */}
                    {props.items.map((item, index) => (
                        <ItemMenu key={index} {...item} isActive={location.pathname === item.path} />
                    ))}
                </ul>
                {/* Custom User */}
                <ul className="absolute bottom-0 inset-x-0">
                    {
                        // User menu
                        toggle && (
                            <div className="m-2 p-2 bg-violet-400 rounded-lg border-white border text-white">
                                <ItemMenu path="/profile" content="Profile" iconCss="fa-light fa-eye" />
                                <ItemMenu path="/settings" content="Settings" iconCss="fa-light fa-cog" />
                                <hr className="my-1" />
                                {/* Sign out */}
                                <li className={itemMenuStyle.Item} onClick={handleSignOut}>
                                    {/* Avatar */}
                                    <div className="grid place-content-center w-8 h-8">
                                        <i className="fa-light fa-right-from-bracket" />
                                    </div>
                                    {/* Nominative */}
                                    <span className={itemMenuStyle.Content}>{t("Sign out")}</span>
                                </li>
                            </div>
                        )
                    }
                    {/* User */}
                    <li
                        className="flex items-center text-base p-4 hover:bg-violet-400 hover:text-white cursor-pointer"
                        onClick={() => setToggle(!toggle)}
                    >
                        {/* Avatar */}
                        <div className="grid place-content-center w-8 h-8">
                            <i className="fa-light fa-user" />
                        </div>
                        {/* Nominative */}
                        <span className={itemMenuStyle.Content}>{nominative ?? "Unknown"}</span>
                    </li>
                </ul>
            </div>
        </SidebarComponent>
    );
};

export default SidebarMenu;
