import { useState, useRef, useEffect, useContext } from "react";
import styles from "./PanelSidebar.module.css"

import fxIcon from "@/assets/fx.svg";
import pianoIcon from "@/assets/piano.svg";
import sineIcon from "@/assets/sine.svg";
import volumeIcon from "@/assets/volume.svg";
import { PanelName } from "@/types/types";
import { SynthContext } from "@/contexts/SynthContext";

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
                <button
                    className={`${styles["nav-button"]} ${active === "Effects" ? styles["active"] : ""}`}
                    onClick={() => switchPanel("Effects")}
                    title="Effects — add audio effects to your signal"
                >
                    <img src={fxIcon} alt="Effects" />
                </button>
                <button
                    className={`${styles["nav-button"]} ${active === "Sequencer" ? styles["active"] : ""}`}
                    onClick={() => switchPanel("Sequencer")}
                    title="Sequencer — create note sequences"
                >
                    <img src={pianoIcon} alt="Sequencer" />
                </button>
                <button
                    className={`${styles["nav-button"]} ${active === "Synth Patch" ? styles["active"] : ""}`}
                    onClick={() => switchPanel("Synth Patch")}
                    title="Synth Patch — configure oscillator and synth parameters"
                >
                    <img src={sineIcon} alt="Synth Patch" />
                </button>
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