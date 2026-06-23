import { useState } from "react";
import styles from "./Panel.module.css";
import SynthSelect from "../controls/SynthSelect";
import PanelSidebar from "./PanelSidebar";
import { PanelName } from "@/types/types";

interface PanelProps {
  panels: Record<PanelName, React.ReactNode>
  className?: string
  defaultCollapsed?: boolean
}

const Panel = ({ panels, className, defaultCollapsed = false }: PanelProps) => {
  const [activePanel, setActivePanel] = useState<PanelName>("Effects");
  const switchPanel = (panel: PanelName) => setActivePanel(panel);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const toggleCollapse = () => setIsCollapsed(prev => !prev);

  return (
    <div className={`${styles["container"]} ${className ?? ""}`}>
      <div className={styles["sidebar"]}>
        <PanelSidebar active={activePanel} switchPanel={switchPanel} />
      </div>
      <section className={styles["panel"]}>
        <div className={styles["header"]}>
          <h2 className={styles["title"]}>{activePanel}</h2>
          <SynthSelect />
        </div>
        <div className={`${styles["content"]} ${isCollapsed ? styles["collapsed"] : ""}`}>
          {panels[activePanel]}
        </div>
        <div className={styles["footer"]}>
          <button className={styles["collapseButton"]} onClick={toggleCollapse}>
            {isCollapsed ? "Show" : "Hide"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Panel;
