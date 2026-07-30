import styles from "./HelpModal.module.css"

const HelpModal = ({ dialogRef, closeDialog }: { dialogRef: React.Ref<HTMLDialogElement>, closeDialog: () => void }) => {

    return (
        <dialog ref={dialogRef} className={styles["overlay"]}>
            <div className={styles["wrapper"]}>
                <div className={styles["header"]}>
                    <h2>Help</h2>
                    <button className={styles["close-button"]} onClick={closeDialog}>✕</button>
                </div>
                <div className={styles["background"]}>
                    <div className={styles["help-section"]}>
                        <h3>Labels</h3>
                        <p>Cycles through label modes on the piano keys: note names (C3, C3#, D3...), keyboard keys (A, S, D...), or none.</p>
                    </div>
                    <div className={styles["help-section"]}>
                        <h3>Polyphony</h3>
                        <p>Toggle switch that enables playing multiple notes simultaneously. When off, only one note plays at a time (monophonic).</p>
                    </div>
                    <div className={styles["help-section"]}>
                        <h3>Octave Switching</h3>
                        <p>Press <kbd>Shift</kbd> + <kbd>↑</kbd> or <kbd>Shift</kbd> + <kbd>↓</kbd> to raise or lower the current octave.</p>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default HelpModal
