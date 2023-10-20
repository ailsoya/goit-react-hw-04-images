import styles from './Style.module.css'

export const Searchbar = ({ onSubmit }) => {
    return (
        <header className={styles.Searchbar}>
            <form className={styles.SearchForm}  onSubmit={evt => onSubmit(evt)}>
                <button type="submit" className={styles.SearchFormButton}>
                    <span className={styles.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                    name="search"
                    className={styles.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
}