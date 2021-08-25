import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PropTypes from 'prop-types';
import { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import './ImageGallery.scss'



class ImageGallery extends Component{
 
    render() {
        const { searchPictures } = this.props;
        return <ul className="ImageGallery">
            
            {searchPictures && searchPictures.map(pic =>
                <ImageGalleryItem key={pic.id} searchPicture={pic} onClick={this.props.onClick}/>)}
            
        </ul>
            
    }
}

ImageGallery.propTypes = {
    searchPictures: PropTypes.array,
    onClick: PropTypes.func.isRequired,
}
export default ImageGallery;