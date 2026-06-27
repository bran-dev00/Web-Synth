import { useState, useRef, useLayoutEffect, type CSSProperties } from "react";
import styles from "./Panel.module.css";
import SynthSelect from "../controls/SynthSelect";
import PanelSidebar from "./PanelSidebar";
import { PanelName } from "@/types/types";

interface PanelProps {
  panels: Record<PanelName, React.ReactNode>
  className?: string
  defaultCollapsed?: boolean
}

const MIN_EXPANDED_HEIGHT = 500;

const Panel = ({ panels, className, defaultCollapsed = false }: PanelProps) => {
  const [activePanel, setActivePanel] = useState<PanelName>("Effects");
  const switchPanel = (panel: PanelName) => setActivePanel(panel);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const toggleCollapse = () => setIsCollapsed(prev => !prev);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [collapsedHeight, setCollapsedHeight] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const sidebar = sidebarRef.current;
    const footer = footerRef.current;

    if (container) {
      setContainerHeight(container.scrollHeight);
    }
    if (sidebar) {
      setSidebarWidth(sidebar.offsetWidth);
    }

    if (container && header && footer) {
      const containerRect = container.getBoundingClientRect();

      const headerBottom = header.getBoundingClientRect().bottom - containerRect.top;

      setCollapsedHeight(headerBottom + footer.offsetHeight);
    }
  }, [activePanel]);

  const containerStyle: CSSProperties = {};
  if (containerHeight !== null && collapsedHeight > 0) {
    containerStyle.maxHeight = isCollapsed
      ? collapsedHeight
      : Math.max(containerHeight, MIN_EXPANDED_HEIGHT);
  }

  const sidebarStyle: CSSProperties = {};
  if (sidebarWidth > 0) {
    sidebarStyle.width = isCollapsed ? 0 : sidebarWidth;
  }

  const contentStyle: CSSProperties = {};
  contentStyle.opacity = isCollapsed ? 0 : 1;

  return (
    <div
      ref={containerRef}
      className={`${styles["container"]} ${!isCollapsed ? styles["containerExpanded"] : ""} ${className ?? ""}`}
      style={containerStyle}
    >
      <div className={styles["bodyWrapper"]}>
        <div
          ref={sidebarRef}
          className={`${styles["sidebar"]} ${isCollapsed ? styles["sidebarCollapsed"] : ""}`}
          style={sidebarStyle}
        >
          <PanelSidebar active={activePanel} switchPanel={switchPanel} />
        </div>
        <section className={styles["panel"]}>
          <div ref={headerRef} className={styles["header"]}>
            <h2 className={styles["title"]}>{activePanel}</h2>
            <SynthSelect />
          </div>
          <div className={styles["content"]} style={contentStyle}>
            {panels[activePanel]}
          </div>
        </section>
      </div>
      <div ref={footerRef} className={styles["footer"]}>
        <button className={styles["collapseButton"]} onClick={toggleCollapse}>
          {isCollapsed ? "Show" : "Hide"}
        </button>
      </div>
    </div>
  );
};

export default Panel;
