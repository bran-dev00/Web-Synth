import styles from "./Navbar.module.css";
import fxIcon from "@/assets/fx.svg";
import pianoIcon from "@/assets/piano.svg";
import sineIcon from "@/assets/sine.svg";
import volumeIcon from "@/assets/volume.svg";
import { PanelName } from "@/types/types";

interface NavbarProps {
    active: PanelTypes;
    switchPanel: (panel: PanelTypes) => void;
}

const Navbar = ({ active, switchPanel }: NavbarProps) => {

    return (
        <nav className={styles["container"]}>
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
            <button className={styles["nav-button"]} title="Volume">
                <img src={volumeIcon} alt="Volume" />
            </button>
        </nav>
    )
}

export default Navbar
