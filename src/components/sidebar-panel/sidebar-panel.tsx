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

export const SidebarPanel = (props: ISidebarPanelProps) => {
    return (
        <SidebarComponent
            data-testid="sidebar-panel"
            target={props.target}
            width={props?.width ?? 320}
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
};
