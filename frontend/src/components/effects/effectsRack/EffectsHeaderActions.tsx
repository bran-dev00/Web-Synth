import { useRef } from "react";
import styles from "./EffectsHeaderActions.module.css"
import AddEffectModal from "../addEffectModal/AddEffectModal";

const EffectsHeaderActions = () => {
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
        <>
            <button className={styles["addButton"]} onClick={openDialog}>+ Add Effect</button>
            <AddEffectModal dialogRef={dialogRef} closeDialog={closeDialog} />
        </>
    );
};

export default EffectsHeaderActions;
