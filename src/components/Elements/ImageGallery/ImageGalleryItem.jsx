import styles from '../Style.module.css'

export const ImageGalleryItem = ({ src, alt, onClick }) => {
    return (
        <li className={styles.ImageGalleryItem}>
            <button onClick={() => onClick()}><img src={src} alt={alt} /></button>
        </li>
    )
}