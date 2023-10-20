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

  const renderImg = () => {
    const key = "39209213-26e6de3edfb0581cbb486c9d2"
    const responce = axios.get(`https://pixabay.com/api/?q=${search}&page=${loadPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`)
    return(responce)
  }
  
  useEffect(() => {
    if(search!=='') {
      setLoading(true)
      renderImg().then(resp => {
        const pics = Object.assign([], picsToRender)
        resp.data.hits.map(function (item) {
          const { id, tags, webformatURL, largeImageURL } = item
          pics.push({ id: id, tags: tags, webformatURL: webformatURL, largeImageURL: largeImageURL })
        })
        setPicsToRender(pics)
        setLoading(false)
      }).catch(error => {
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

/*export class App extends Component {
  state = {
    search: ' ',
    loadPage: 1,
    picsToRender: [],
    picToModal: {},
    isLoading: false,
    isModalOpen: false
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.setState({ 
      search: evt.target.search.value,
      picsToRender: [],
      loadPage: 1
    })
  }

  addMore = () => {
    this.setState((prevState) => {
      return { loadPage: prevState.loadPage + 1 }
    })
  }

  renderImg() {
    const key = "39209213-26e6de3edfb0581cbb486c9d2"
    const { search, loadPage } = this.state
    const responce = axios.get(`https://pixabay.com/api/?q=${search}&page=${loadPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`)
    return(responce)
  }

  componentDidUpdate(prevProps , prevState) {
    if (prevState.search !== this.state.search || prevState.loadPage !== this.state.loadPage) {
      this.setState({ isLoading: true })
      this.renderImg().then(resp => {
        const pics = this.state.picsToRender
        resp.data.hits.map(function (item) {
          const { id, tags, webformatURL, largeImageURL } = item
          pics.push({ id: id, tags: tags, webformatURL: webformatURL, largeImageURL: largeImageURL })
        })
        this.setState({ picsToRender: pics, isLoading: false })
      }).catch(error => {
        console.log(error)
      })
    }
  }

  openModal = id => {
    const picToModal = this.state.picsToRender.filter(pic =>
      pic.id === id
    )
    this.setState({ picToModal: picToModal[0], isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    const { picsToRender, isLoading, picToModal, isModalOpen } = this.state
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSubmit}/>
        <ImageGallery items={picsToRender} onClick={this.openModal}/>
        <div className={styles.Container}>
          <Loader isLoading={isLoading} />
          {Object.keys(picsToRender).length % 12 === 0 && <Button onClick={this.addMore} />}
        </div>
        {isModalOpen && <Modal onClick={this.closeModal} item={picToModal} />}
      </div>
    )
  }
}*/
