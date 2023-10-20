import styles from './Style.module.css'

export const Button = ({ onClick }) => {
    return (
        <button onClick={() => onClick()} type="button" className={styles.Button}>Load more</button>
    )
}