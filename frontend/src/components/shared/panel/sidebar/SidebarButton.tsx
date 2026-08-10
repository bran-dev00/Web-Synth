import styles from "./PanelSidebar.module.css";
import { PanelName } from "@/types/types";

export interface SidebarButtonProps {
    panelName: PanelName;
    icon: string;
    description: string;
    active?: boolean;
    switchPanel: (panel: PanelName) => void;
}

const SidebarButton = ({ panelName, icon, description, active = false, switchPanel }: SidebarButtonProps) => {
    return (
        <button
            onClick={() => switchPanel(panelName)}
            title={description}
            className={`${styles["nav-button"]} ${active ? styles["active"] : ""}`}
        >
            <img src={icon} alt={panelName} />
        </button>
    );
};

export default SidebarButton;
