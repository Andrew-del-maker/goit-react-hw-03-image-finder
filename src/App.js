import React from "react";
import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'
  import styled from "styled-components";



import Searchbar from "./Components/Searchbar";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";
import Loader from "./Components/Loader";
import Modal from "./Components/Modal";



const KEY = '21893197-6d6aad5e906c416c50a626e1f';

const Btn = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

class App extends Component{
  state = {
    searchQuerry: '',
    page: 1,
    searchPictures: null,
    loading: false,
    showModal: false,
    modalImg: null,
  }
  
  handleFormSubmit = (searchQuerry) => {
    this.setState({ searchQuerry })
  }

  handleLoadMore = (page) => {
    this.setState({ page: this.state.page + 1 });
  }

  
  componentDidUpdate(prevProps,prevState) {
        
    if (this.state.searchQuerry !== prevState.searchQuerry) {
            this.setState({ loading: true , searchPictures: null, page: 1});
            fetch(`https://pixabay.com/api/?q=${this.state.searchQuerry}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(res => res.json())
            .then(searchPictures=> this.setState({searchPictures: searchPictures.hits})).finally(()=>{this.setState({loading:false})})
        }
        if (prevState.page !== this.state.page) {
            this.setState({ page: this.state.page })
            fetch(`https://pixabay.com/api/?q=${this.state.searchQuerry}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(res => res.json())
                .then(newPictures => this.setState({ searchPictures: [...this.state.searchPictures, ...newPictures.hits] })).then(setTimeout(() => {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: "smooth"
                     })
                },500))
        }

        
    }
    toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
    }
    setModalImg = (modalImg) => {
        this.setState({
            imgModal: modalImg
        })
    }
    onClickModal = (e) => {
        this.setState({
            showModal: !this.state.showModal,
            modalImg: e.target,
        });
    }

  render() {
    const {searchQuerry, loading, searchPictures, showModal, modalImg} = this.state;
   
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading&&<Loader/>}
        <ImageGallery searchPictures={searchPictures} onClick={this.onClickModal}/>
        {searchQuerry &&
          <Button onLoadMore={this.handleLoadMore} />}
        {showModal && <Modal onClose={this.toggleModal}>
                <img src={modalImg.dataset.img} alt={modalImg.alt} />
                <Btn className="closeIcon" type="button" onClick={this.toggleModal}>X</Btn>
            </Modal>}
        <ToastContainer />
      </div>
    )
  }
}

export default App;
