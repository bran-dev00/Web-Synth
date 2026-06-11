import styles from "./Header.module.css"
import SynthSelect from "../shared/controls/SynthSelect"

const Header = () => {

    return (
        <header className={styles["container"]}>
            <h1>Web Synth</h1>
            <div className={styles["info-box"]} >
                <h3 className={styles["curr-synth"]}>Current Synth:
                    <SynthSelect />
                </h3>
            </div>
        </header >
    )
}

export default Header;