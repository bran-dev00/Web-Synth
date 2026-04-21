import styles from "./AddEffectModal.module.css"

const AddEffectModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    if (!open) return null;

    return (
        <div className={styles["overlay"]} onClick={onClose}>
            <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
                <h3>Add Effect</h3>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default AddEffectModal