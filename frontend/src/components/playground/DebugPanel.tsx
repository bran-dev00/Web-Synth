import styles from "./DebugPanel.module.css"
interface DebugPanelProps {
  data: any;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ data }) => {
  return (
    <div className="container">
          <div className={styles["debug-panel"]}>{JSON.stringify(data)}</div>
    </div>
  );
};

export default DebugPanel;
