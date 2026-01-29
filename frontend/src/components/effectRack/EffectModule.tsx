
// Effect Details

import { EffectType } from "@/types/types";

interface EffectModuleProps {
    effect: EffectType
}

const EffectModule = (props: EffectModuleProps) =>{
    const effect = props.effect;

    return (
        <>
            <div>
                <h3>Name:{effect.effectTypeName} </h3>
                <button>Remove</button>
            </div>
        </>
    );
}

export default EffectModule;