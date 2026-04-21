import styles from "./EffectRack.module.css"
import { SynthContext } from "@/contexts/SynthContext";
import AddEffectModal from "../addEffectModal/AddEffectModal";

import { useEffect, useState, useContext } from "react";

const EffectsRack = () => {
    const { effects } = useContext(SynthContext);

    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div className={styles["container"]}>
            <button onClick={() => setIsModalOpen(true)}>Add Effect</button>

            <AddEffectModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className={styles["modules"]}>

            </div>
        </div>
    );
};

export default EffectsRack 