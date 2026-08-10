import styles from "./EffectRack.module.css"
import { SynthContext } from "@/contexts/SynthContext";
import EffectModule from "../effectModule/EffectModule";

import { useContext } from "react";

const EffectsRack = () => {
    const { effectChain } = useContext(SynthContext);

    return (
        <div className={styles["container"]}>
            {effectChain.map((effect) => (
                <EffectModule key={effect.id} effect={effect} />
            ))}
        </div>
    );
};

export default EffectsRack
