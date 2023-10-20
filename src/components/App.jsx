/* eslint-disable array-callback-return */
import React from "react"
import { Component } from 'react'
import { Searchbar } from './Elements/Searchbar'
import { ImageGallery } from './Elements/ImageGallery/ImageGallery'
import { Button } from './Elements/Button'
import { Loader } from './Elements/Loader'
import { Modal } from './Elements/Modal'
import axios from "axios"
import styles from './Elements/Style.module.css'

export class App extends Component {
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
}
