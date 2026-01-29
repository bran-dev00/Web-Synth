import { useAudioEffects } from "@/hooks/useAudioEffects";
import { EffectTypeName } from "@/types/types";
import EffectModule from "./EffectModule";
import { useEffect, useState } from "react";

const EffectRack = () => {
    const { addEffect, effects } = useAudioEffects();
    const defaultEffects: EffectTypeName[] = ["Chorus", "Reverb", "Distortion", "Phaser", "Filter"];

    const [effectEntries, setEffectEntries] = useState(effects.keys())

    const [effectArr, setEffectArr] = useState(null);

    const [testState, setTestState] = useState("Initial State")

    // 
    const getActiveEffects = () =>{


    }

    const updateTestState = () =>{
        setTestState(`New Updated State`);
    }

    useEffect(() =>{
        updateTestState()
    },[addEffect])

    return (
        <>
            <div>
                <h1>Effect Rack</h1>

                <div>
                    {/* Sub-Menu? */}
                    <div>
                        <h3>Active Effects</h3>
                        <h1>{testState}</h1>

                        <div>
                            <div>
                                <p>Instances:</p>
                            </div>


                        </div>


                        {Array.from(effects.entries()).map(([effectTypeName, effectArray]) => (
                            <div key={effectTypeName}>
                                {effectArray.map((effect) => (
                                    // <p key={effect.id}>{effect.nickname}</p>
                                    <EffectModule effect={effect} />
                                ))}
                            </div>
                        ))}

                        {/* <EffectModule/> */}
                    </div>

                    <div>
                        <p>Add Effect</p>
                        <ul>
                            {defaultEffects.map((effect) => {
                                return (
                                    <li key={effect}>
                                        <button onClick={() => addEffect(effect)}>{effect}</button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export {EffectRack}