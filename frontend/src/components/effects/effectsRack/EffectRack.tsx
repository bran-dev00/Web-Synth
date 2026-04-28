import styles from "./EffectRack.module.css"
import { SynthContext } from "@/contexts/SynthContext";
import AddEffectModal from "../addEffectModal/AddEffectModal";
import EffectModule from "../effectModule/EffectModule";


import { useRef, useContext } from "react";

const EffectsRack = () => {
    const { effectChain } = useContext(SynthContext);
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
            <div className={styles["header"]}>
                <button className={styles["add-effects-button"]} onClick={() => openDialog()}>Add Effect</button>
            </div>

            <AddEffectModal dialogRef={dialogRef} closeDialog={() => closeDialog()} />
            {
                effectChain.map((effect) => (
                    <div key={effect.id} className={styles["modules"]}>
                        <EffectModule key={effect.id} effect={effect} />
                    </div>
                ))
            }

        </div>
    );
};

export default EffectsRack 