import React, { Component } from 'react';
import ImageList from '../../ImageList/ImageList';

import Image from '../../../helper/Image';
import Gallery from '../../../helper/Gallery';

const placeHolderImage = new Image(1, 1920 , 1080, new Date());
const placeholderGallery = new Gallery('test', 'Test', placeHolderImage);

interface SingleGalleryState {
    gallery: Gallery;
    images: Image[];
}

class SingleGallery extends Component {
    state = {  
        gallery: placeholderGallery,
        images: [
            placeHolderImage,
            placeHolderImage,
            placeHolderImage,
            placeHolderImage,
            placeHolderImage,
            placeHolderImage,
            placeHolderImage,
            placeHolderImage,
            placeHolderImage,
            placeHolderImage,
            placeHolderImage,
            placeHolderImage
        ]
    }
    fetchImages() {

    }

    fetchGallery() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <ImageList images={this.state.images} gallery={this.state.gallery}/>
        )
    }
}

export default SingleGallery;