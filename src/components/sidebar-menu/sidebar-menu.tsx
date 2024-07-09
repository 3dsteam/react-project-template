import { useEffect, useState } from "react";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import Logo from "@assets/logo.svg";
import "./style.scss";

interface ISidebarMenuProps {
    target?: string;
    isOpen: boolean;
    items: IMenuItem[];
    activeKey?: string;
    onItemSelect: (eventKey: string) => void;
    onOpen?: () => void;
    onClose?: () => void;
}

interface IMenuItem {
    code: string;
    text: string;
    iconCss: string;
    items?: IMenuItem[];
}

export default function SidebarMenu(props: ISidebarMenuProps) {
    const [activeKey, setActiveKey] = useState<string | undefined>(props.activeKey);
    useEffect(() => setActiveKey(props.activeKey), [props.activeKey]);

    const handleItemSelect = (eventKey: string) => {
        setActiveKey(eventKey);
        props.onItemSelect(eventKey);
    };

    return (
        <SidebarComponent
            data-testid="sidebar-menu"
            target={props.target}
            width={240}
            isOpen={props.isOpen}
            type="Push"
            enableGestures={false}
            open={props.onOpen}
            close={props.onClose}
        >
            <div className="sidebar-menu main-padding space-y-8">
                {/* Header */}
                <img src={Logo} className="h-24 object-contain mx-auto" alt="logo" />
                {/* Menu items */}
                <ul className="space-y-2">
                    {props.items.map((item) => (
                        <li
                            key={item.code}
                            data-testid="sidebar-menu-item"
                            className={`sidebar-menu-item ${activeKey === item.code ? "active" : ""}`}
                            onClick={() => handleItemSelect(item.code)}
                        >
                            <i className={item.iconCss} /> {item.text}
                        </li>
                    ))}
                </ul>
            </div>
        </SidebarComponent>
    );
}
