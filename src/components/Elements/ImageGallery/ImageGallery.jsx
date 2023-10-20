import { ImageGalleryItem } from './ImageGalleryItem'
import styles from '../Style.module.css'

export const ImageGallery = ({ items, onClick }) => {
    return (
        <ul className={styles.ImageGallery}>
            {items.map(item => (
                <ImageGalleryItem key={item.id} src={item.webformatURL} alt={item.tags} onClick={() => onClick(item.id)}/>
            ))}
        </ul>
    )
}