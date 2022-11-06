import styles from "../styles/Error.module.css";

export default function Error(props) {
    return (
        <>
            <h1 className={styles.title}>{props.title}</h1>
            <p className={styles.message}>{props.msg}</p>
        </>
    )
}