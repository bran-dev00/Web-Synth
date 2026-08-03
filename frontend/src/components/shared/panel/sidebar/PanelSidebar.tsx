import { useState, useRef, useEffect, useContext } from "react";
import styles from "./PanelSidebar.module.css";

import volumeIcon from "@/assets/volume.svg";

import { panels } from "@/data/Panels";
import { PanelName } from "@/types/types";
import { SynthContext } from "@/contexts/SynthContext";
import SidebarButton from "./SidebarButton";

interface PanelSidebarProps {
    active: PanelName;
    switchPanel: (panel: PanelName) => void;
}

const PanelSidebar = ({ active, switchPanel }: PanelSidebarProps) => {
    const [isVolumeOpen, setIsVolumeOpen] = useState(false);
    const { volume, setVolume } = useContext(SynthContext);
    const volumeWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (volumeWrapperRef.current && !volumeWrapperRef.current.contains(e.target as Node)) {
                setIsVolumeOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className={styles["container"]}>
            <div className={styles["nav-top"]}>
                {Object.values(panels).map((panel) => (
                    <SidebarButton
                        key={panel.name}
                        panelName={panel.name}
                        icon={panel.icon}
                        description={panel.description}
                        active={active === panel.name}
                        switchPanel={switchPanel}
                    />
                ))}
            </div>

            <div className={styles["volume-wrapper"]} ref={volumeWrapperRef}>
                <button
                    className={styles["nav-button"]}
                    onClick={() => setIsVolumeOpen(prev => !prev)}
                    title="Volume"
                >
                    <img src={volumeIcon} alt="Volume" />
                </button>
                <div className={`${styles["volume-slider"]} ${isVolumeOpen ? styles["open"] : ""}`}>
                    <div className={styles["volume-slider-inner"]}>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={e => setVolume(Number(e.target.value))}
                        />
                        <span className={styles["volume-label"]}>
                            {Math.round(volume * 100)}%
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default PanelSidebar;