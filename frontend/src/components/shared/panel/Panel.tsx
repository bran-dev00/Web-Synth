import { useState } from "react";
import styles from "./Panel.module.css";
import SynthSelect from "../controls/SynthSelect";

interface PanelProps {
  title: string
  children: React.ReactNode
  className?: string
  defaultCollapsed?: boolean
}

const Panel = ({ title, children, className, defaultCollapsed = false }: PanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const toggleCollapse = () => setIsCollapsed(prev => !prev);

  return (
    <section className={`${styles["panel"]} ${className ?? ""}`}>
      <div className={styles["header"]}>
        <h2 className={styles["title"]}>{title}</h2>
        <SynthSelect />
      </div>
      <div className={`${styles["content"]} ${isCollapsed ? styles["collapsed"] : ""}`}>
        {children}
      </div>
      <div className={styles["footer"]}>
        <button className={styles["collapseButton"]} onClick={toggleCollapse}>
          {isCollapsed ? "Show" : "Hide"}
        </button>
      </div>
    </section>
  );
};

export default Panel;
