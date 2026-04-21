import styles from "./AddEffectModal.module.css"

const AddEffectModal = ({ dialogRef, closeDialog }: { dialogRef: React.Ref<HTMLDialogElement>, closeDialog: () => void }) => {
    return (
        <dialog ref={dialogRef} className={styles["overlay"]}>
            <div className={styles["content"]} onClick={(e) => e.stopPropagation()}>
                <h3>Add Effect</h3>


                <button onClick={closeDialog}>Close</button>
            </div>
        </dialog>
    )
}

export default AddEffectModal