import styles from "./AddEffectModal.module.css"
import { useAudioEffects } from "@/hooks/useAudioEffects"
import { EffectTypeName } from "@/types/types"

const AddEffectModal = ({ dialogRef, closeDialog }: { dialogRef: React.Ref<HTMLDialogElement>, closeDialog: () => void }) => {

    const { addEffect } = useAudioEffects();
    const effectsList: EffectTypeName[] = ["Chorus", "Distortion", "Reverb", "AutoFilter", "Phaser", "Vibrato", "Tremolo", "AutoPanner", "BitCrusher"];

    const handleAddEffect = (name: EffectTypeName) => {
        addEffect(name);
        closeDialog();
    }

    return (
        <dialog ref={dialogRef} className={styles["overlay"]}>
            <div className={styles["wrapper"]}>
                <div className={styles["header"]}>
                    <h2>Add Effect</h2>
                    <button className={styles["close-button"]} onClick={closeDialog}>✕</button>
                </div>
                {/* <div className={styles["separator-line"]}></div> */}
                <div className={styles["background"]}>

                    <div className={styles["buttons-wrapper"]}>
                        {effectsList.map((name) => (
                            <button onClick={() => handleAddEffect(name)} className={styles["effect-button"]}>{name}</button>
                        ))}
                    </div>

                </div>
            </div>
        </dialog >
    )
}

export default AddEffectModal