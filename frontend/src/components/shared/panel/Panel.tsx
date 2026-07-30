import { useState } from "react";
import styles from "./Panel.module.css";
import SynthSelect from "../controls/SynthSelect";
import PanelSidebar from "./PanelSidebar";
import { PanelName } from "@/types/types";

interface PanelProps {
  panels: Partial<Record<PanelName, React.ReactNode>>
  headerActions?: Partial<Record<PanelName, React.ReactNode>>
  className?: string
  defaultCollapsed?: boolean
  onToggleCollapse?: (collapsed: boolean) => void
}

const Panel = ({ panels, headerActions, className, defaultCollapsed = false, onToggleCollapse }: PanelProps) => {
  const [activePanel, setActivePanel] = useState<PanelName>("Effects");
  const switchPanel = (panel: PanelName) => setActivePanel(panel);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const toggleCollapse = () => setIsCollapsed(prev => { const next = !prev; onToggleCollapse?.(next); return next; });

  return (
    <div
      className={`${styles["container"]} ${!isCollapsed ? styles["containerExpanded"] : ""} ${isCollapsed ? styles["containerCollapsed"] : ""} ${className ?? ""}`}
    >
      <div className={styles["sidebar"]}>
        <PanelSidebar active={activePanel} switchPanel={switchPanel} />
      </div>
      <div className={styles["header"]}>
        <div className={styles["headerLeft"]}>
          <h2 className={styles["title"]}>{activePanel}</h2>
          {headerActions?.[activePanel]}
        </div>
        <SynthSelect />
      </div>
      <div className={styles["bodyWrapper"]}>
        <section className={styles["panel"]}>
          <div className={styles["content"]}>
            {panels[activePanel]}
          </div>
        </section>
      </div>
      <div className={styles["footer"]}>
        <button className={styles["collapseButton"]} onClick={toggleCollapse}>
          {isCollapsed ? "Show" : "Hide"}
        </button>
      </div>
    </div>
  );
};

export default Panel;
