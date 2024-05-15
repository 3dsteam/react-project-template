import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { PropsWithChildren } from "react";

interface ISidebarPanelProps extends PropsWithChildren {
    target?: string;
    position?: "Left" | "Right";
    width?: number;
    isOpen: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

export default function SidebarPanel(props: ISidebarPanelProps) {
    return (
        <SidebarComponent
            data-testid="sidebar-panel"
            target={props.target}
            width={props?.width ?? 280}
            position={props.position ?? "Right"}
            isOpen={props.isOpen}
            type="Push"
            enableGestures={false}
            open={props.onOpen}
            close={props.onClose}
        >
            {props.children}
        </SidebarComponent>
    );
}
