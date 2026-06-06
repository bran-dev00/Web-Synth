import styles from "./EffectRack.module.css"
import { SynthContext } from "@/contexts/SynthContext";
import AddEffectModal from "../addEffectModal/AddEffectModal";
import EffectModule from "../effectModule/EffectModule";

import { useRef, useContext, useState, useEffect } from "react";

const EffectsRack = () => {
    const { effectChain } = useContext(SynthContext);
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

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

    const toggleCollapse = () => setIsCollapsed(prev => !prev);

    useEffect(() => {
        if (effectChain.length === 0 && isCollapsed) {
            setIsCollapsed(false);
        }
    }, [effectChain.length, isCollapsed]);

    return (
        <div className={`${styles["container"]} ${isCollapsed ? styles["collapsed"] : ""}`}>
            <div className={`${styles["collapsible"]} ${isCollapsed ? styles["collapsed"] : ""}`}>
                <button className={styles["add-effects-button"]} onClick={() => openDialog()}>+ Add Effect</button>

                <AddEffectModal dialogRef={dialogRef} closeDialog={() => closeDialog()} />

                {effectChain.map((effect) => (
                    <EffectModule key={effect.id} effect={effect} />
                ))}
            </div>

            {effectChain.length > 0 && (
                <button className={styles["collapse-button"]} onClick={toggleCollapse}>
                    {isCollapsed ? "Show" : "Hide"}
                </button>
            )}
        </div>
    );
};

export default EffectsRack