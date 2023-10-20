import styles from './Style.module.css'

export const Modal = ({ item, onClick }) => {
    return (
        <div className={styles.Overlay} onClick={onClick}>
            <div className={styles.Modal}>
                <img src={item.largeImageURL} alt={item.tags} />
            </div>
        </div>
    )
}