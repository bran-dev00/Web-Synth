import styles from "./EffectRack.module.css"
import { SynthContext } from "@/contexts/SynthContext";
import AddEffectModal from "../addEffectModal/AddEffectModal";

import { useRef, useState, useContext } from "react";

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
            <button onClick={() => openDialog()}>Add Effect</button>

            <AddEffectModal dialogRef={dialogRef} closeDialog={() => closeDialog()} />

            <div className={styles["modules"]}>

            </div>
        </div>
    );
};

export default EffectsRack 