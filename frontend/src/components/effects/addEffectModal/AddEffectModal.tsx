import styles from "./AddEffectModal.module.css"
import { useAudioEffects } from "@/hooks/useAudioEffects"
import { EffectTypeName } from "@/types/types"

const AddEffectModal = ({ dialogRef, closeDialog }: { dialogRef: React.Ref<HTMLDialogElement>, closeDialog: () => void }) => {

    const { addEffect } = useAudioEffects();
    const effectsList: EffectTypeName[] = ["Chorus", "Distortion", "Reverb", "Filter"];

    const handleAddEffect = (name: EffectTypeName) => {
        addEffect(name);
        closeDialog();
    }

    return (
        <dialog ref={dialogRef} className={styles["overlay"]}>
            <button className={styles["close-button"]} onClick={closeDialog}>Close</button>
            <div className={styles["content"]} onClick={(e) => e.stopPropagation()}>
                <h3>Add Effect</h3>
                <div className={styles["buttons-wrapper"]}>
                    {effectsList.map((name) => (
                        <button onClick={() => handleAddEffect(name)} className={styles["effect-button"]}> {name}</button>
                    ))}
                </div>

            </div>
        </dialog >
    )
}

export default AddEffectModal