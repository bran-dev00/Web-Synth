import { useContext } from "react";
import styles from "./SynthSelect.module.css"
import { SynthContext } from "@/contexts/SynthContext";

const SynthSelect = () => {
    const { changeSynth } = useContext(SynthContext);

    //TODO: Extract synth options to a separate file and map through them here instead of hardcoding them in the JSX
    return (
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
    )

}

export default SynthSelect;