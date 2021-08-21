import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import Loader from "../Loader";
import Modal from "../Modal";
import './ImageGallery.scss'

const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;
const KEY = '21893197-6d6aad5e906c416c50a626e1f';

class ImageGallery extends Component{
    state = {
    
        searchPictures: null,
        page: 1,
        loading: false,
        showModal: false,
        imgModal: null,

    }
    
    componentDidUpdate(prevProps, prevState) {
        
        
        if (prevProps.searchQuerry !== this.props.searchQuerry) {
            this.setState({ loading: true , searchPictures: null, page: 1});
            fetch(`https://pixabay.com/api/?q=${this.props.searchQuerry}&page=${this.props.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(res => res.json())
            .then(searchPictures=> this.setState({searchPictures: searchPictures.hits})).finally(()=>{this.setState({loading:false})})
            
            
        }
        if (prevProps.page !== this.props.page) {
            this.setState({ page: this.props.page })
            fetch(`https://pixabay.com/api/?q=${this.props.searchQuerry}&page=${this.props.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
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
    render() {
        const { searchPictures, imgModal } = this.state;
        return <ul className="ImageGallery">
            {this.state.loading&&<Loader/>}
            {searchPictures && <ImageGalleryItem onModal={this.toggleModal} onSetModalImg={this.setModalImg} searchPictures={searchPictures} />}
            {this.state.showModal && <Modal onClose={this.toggleModal}>
                <img src={imgModal.dataset.img} alt={imgModal.alt} />
                <Button className="closeIcon" type="button" onClick={this.toggleModal}>X</Button>
            </Modal>}
        </ul>
            
    }
}

ImageGallery.propTypes = {
    searchQuerry: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
}

export default ImageGallery;