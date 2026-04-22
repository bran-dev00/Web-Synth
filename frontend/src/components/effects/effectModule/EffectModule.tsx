import { EffectType } from "@/types/types";
import styles from "./EffectModule.module.css"
import { useAudioEffects } from "@/hooks/useAudioEffects";

interface EffectModuleProps {
    effect: EffectType
}

const EffectModule = (props: EffectModuleProps) => {
    const effect = props.effect;
    const effectInstance = effect.instance;
    console.log("Effect Instance", effect.effectTypeName, effectInstance.get());


    const { removeEffect } = useAudioEffects();

    //Effect Parameters
    return (
        <>
            <div className={styles["container"]}>
                <h3>Name:{effect.effectTypeName} </h3>

                <button className={styles["remove-button"]} onClick={() => removeEffect(effect.effectTypeName, effect.id)}>Remove</button>
            </div>
        </>
    );
}

export default EffectModule;