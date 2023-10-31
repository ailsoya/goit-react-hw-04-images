/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useState, useEffect, React } from "react"
import { Searchbar } from './Elements/Searchbar'
import { ImageGallery } from './Elements/ImageGallery/ImageGallery'
import { Button } from './Elements/Button'
import { Loader } from './Elements/Loader'
import { Modal } from './Elements/Modal'
import axios from "axios"
import styles from './Elements/Style.module.css'

export const App = () => {
  const [search, setSearch] = useState('')
  const [loadPage, setPage] = useState(1)
  const [picsToRender, setPicsToRender] = useState([])
  const [picToModal, setPicToModal] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  const handleSubmit = evt => {
    evt.preventDefault()
    setSearch(evt.target.search.value)
    setPicsToRender([])
    setPage(1)
  }

  const addMore = () => {
    setPage(loadPage + 1)
  }
  
  useEffect(() => {
    if(search!=='') {
      const key = "39209213-26e6de3edfb0581cbb486c9d2"
      setLoading(true)
      axios.get(`https://pixabay.com/api/?q=${search}&page=${loadPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(resp => {
          const pics = Object.assign([], picsToRender)
          resp.data.hits.map(function (item) {
            const { id, tags, webformatURL, largeImageURL } = item
            pics.push({ id: id, tags: tags, webformatURL: webformatURL, largeImageURL: largeImageURL })
          })
          setPicsToRender(pics)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [search, loadPage])

  const openModal = id => {
    let copy = Object.assign([], picsToRender)
    const picToModal = copy.filter(pic =>
      pic.id === id
    )
    setPicToModal(picToModal[0])
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSubmit}/>
      <ImageGallery items={picsToRender} onClick={openModal}/>
      <div className={styles.Container}>
        <Loader isLoading={isLoading} />
        {Object.keys(picsToRender).length % 12 === 0 && <Button onClick={addMore} />}
      </div>
      {isModalOpen && <Modal onClick={closeModal} item={picToModal} />}
    </div>
  )
}