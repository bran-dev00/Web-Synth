import styles from "./ToggleSwitch.module.css"

interface ToggleSwitchProps {
    checked: boolean;
    label: string;
    handleClick: () => void;
}

const ToggleSwitch = ({ checked, label, handleClick }: ToggleSwitchProps) => {

    return (
        <>
            <label className={styles["switch"]} onClick={handleClick} htmlFor="">
                <span className={styles["label-text"]}>{label}</span>
                <input className={styles["input"]} type="checkbox" checked={checked} name="" id="" />
                <span className={styles["track"]}>
                    <span className={styles["thumb"]}></span>
                </span>
            </label>
        </>
    )

}

export default ToggleSwitch;