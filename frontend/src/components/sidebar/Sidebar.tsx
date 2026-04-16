import styles from "./Sidebar.module.css"

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <ul className={styles["menu-items"]}>
                <button className={styles["sidebar-tab"]}>Placeholder</button>
                <button className={styles["sidebar-tab"]}>Placeholder</button>
                <button className={styles["sidebar-tab"]}>Placeholder</button>
            </ul>
        </div>
    )
}

export default Sidebar