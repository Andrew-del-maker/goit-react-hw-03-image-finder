import { Component } from "react";
import './ImageGalleryItem.scss';
import PropTypes from 'prop-types';


class ImageGalleryItem extends Component{
    
    render() {
        const { searchPicture, onClick } = this.props;
        return <li  className="ImageGalleryItem" onClick={onClick}>
                <img src={searchPicture.previewURL} alt={searchPicture.tags} className="ImageGalleryItem-image" data-img={searchPicture.largeImageURL}></img>
                
            </li>
        
    }
}

ImageGalleryItem.propTypes = {
    searchPicture: PropTypes.any,
    onClick: PropTypes.func.isRequired,
}
export default ImageGalleryItem;