import { EffectType } from "@/types/types";
import styles from "./EffectModule.module.css"

interface EffectModuleProps {
    effect: EffectType
}

const EffectModule = (props: EffectModuleProps) => {
    const effect = props.effect;

    //Effect Parameters
    return (
        <>
            <div className={styles["container"]}>
                <h3>Name:{effect.effectTypeName} </h3>

                <button>Remove</button>
            </div>
        </>
    );
}

export default EffectModule;