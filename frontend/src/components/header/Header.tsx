import { useContext } from "react";
import styles from "./Header.module.css"
import { SynthContext } from "@/contexts/SynthContext";

const Header = () => {

    const { changeSynth } = useContext(SynthContext);


    return (
        <header className={styles["container"]}>
            <h1>Web Synth</h1>
            <div className={styles["info-box"]} >
                <h3 className={styles["curr-synth"]}>Current Synth:
                    <select
                        onChange={(e) => {
                            const selectedSynth = e.target.value;
                            changeSynth(selectedSynth);
                        }}
                        name="synthSelect" id="synthSelect" className={styles["synth-select"]}>
                        <option value="Synth">Synth</option>
                        <option value="AMSynth">AM Synth</option>
                        <option value="FMSynth">FM Synth</option>
                        <option value="DuoSynth">Duo Synth</option>
                        <option value="MonoSynth">Mono Synth</option>
                        <option value="MetalSynth">Metal Synth</option>
                        <option value="MembraneSynth">Membrane Synth</option>
                        <option value="PluckSynth">Pluck Synth</option>
                        <option value="NoiseSynth">Noise Synth</option>
                    </select>
                </h3>
            </div>
        </header >
    )
}

export default Header;