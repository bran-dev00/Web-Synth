import styles from "./EffectRack.module.css"
import { SynthContext } from "@/contexts/SynthContext";
import AddEffectModal from "../addEffectModal/AddEffectModal";
import EffectModule from "../effectModule/EffectModule";


import { useRef, useContext } from "react";

const EffectsRack = () => {
    const { effects } = useContext(SynthContext);

    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    }

    return (
        <div className={styles["container"]}>
            <button className={styles["add-effects-button"]} onClick={() => openDialog()}>Add Effect</button>

            <AddEffectModal dialogRef={dialogRef} closeDialog={() => closeDialog()} />

            {Array.from(effects.entries()).map(([effectTypeName, effectList]) => (
                <div key={effectTypeName}>
                    <div className={styles["effect-tab"]}>{effectTypeName}</div>
                    {effectList.map((effect, index) =>
                    (
                        <div key={index} className={styles["modules"]}>
                            <EffectModule key={effect.id} effect={effect} />
                        </div>
                    )
                    )}
                </div>
            )
            )}



        </div>
    );
};

export default EffectsRack 