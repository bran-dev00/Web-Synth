import { EffectType } from "@/types/types";
import styles from "./EffectModule.module.css"
import { useAudioEffects } from "@/hooks/useAudioEffects";
import EffectParams from "../effectParams/EffectParams";

interface EffectModuleProps {
    effect: EffectType
}

const EffectModule = (props: EffectModuleProps) => {
    const effect = props.effect;
    // const effectInstance = effect.instance;
    // console.log("Effect Instance", effect.effectTypeName, effectInstance.get());

    const { removeEffect } = useAudioEffects();

    return (
        <div className={styles["container"]}>
            <div className={styles["header"]}>
                <h3 className={styles["module-name"]}>{effect.effectTypeName}</h3>
                <button
                    className={styles["remove-button"]}
                    onClick={() => removeEffect(effect.id)}
                    title="Remove effect"
                >
                    ✕
                </button>
            </div>
            <div className={styles["params"]}>
                <EffectParams effectName={effect.effectTypeName} effectInstance={effect.instance} />
            </div>
        </div>
    );
}

export default EffectModule