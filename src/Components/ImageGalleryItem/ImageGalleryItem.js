import { Component } from "react";
import './ImageGalleryItem.scss';
import PropTypes from 'prop-types';


class ImageGalleryItem extends Component{
    state={
        showModal: false,
        modalImg: null,
    }
    onClickModal = (e) => {
        this.setState({
            showModal: !this.state.showModal,
            modalImg: e.target,
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.showModal !== this.state.showModal) {
            
            this.props.onModal(this.state.showModal);
            this.props.onSetModalImg(this.state.modalImg);
        }
        
    }
    render() {
        return this.props.searchPictures.map(pic => {
            return <li key={pic.id} className="ImageGalleryItem" onClick={this.onClickModal}>
                <img src={pic.previewURL} alt={pic.tags} className="ImageGalleryItem-image" data-img={pic.largeImageURL}></img>
                
            </li>
        })
    }
}
ImageGalleryItem.propTypes = {
    onModal: PropTypes.func.isRequired,
    onSetModalImg: PropTypes.func.isRequired,
    searchPictures: PropTypes.array.isRequired,
} 
export default ImageGalleryItem;