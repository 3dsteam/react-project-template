import { useTranslation } from "react-i18next";
import style from "./item-menu.module.scss";
import { Link } from "@tanstack/react-router";

interface IItemMenuProps {
    path: string;
    content: string;
    iconCss: string;
    isActive?: boolean;
    onClick?: () => void;
}

const ItemMenu = (props: IItemMenuProps) => {
    const { t } = useTranslation();

    return (
        <Link to={props.path} className={`${style.Item} ${props.isActive ? "active" : ""}`}>
            {/* Avatar */}
            <div className="grid place-content-center w-8 h-8">
                <i className={props.iconCss} />
            </div>
            {/* Nominative */}
            <span className={style.Content}>{t(props.content)}</span>
        </Link>
    );
};

export type { IItemMenuProps };
export default ItemMenu;
