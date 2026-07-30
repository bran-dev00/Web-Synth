import { useRef } from "react";
import AddEffectModal from "./addEffectModal/AddEffectModal";

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
            <button onClick={openDialog}>+ Add Effect</button>
            <AddEffectModal dialogRef={dialogRef} closeDialog={closeDialog} />
        </>
    );
};

export default EffectsHeaderActions;
