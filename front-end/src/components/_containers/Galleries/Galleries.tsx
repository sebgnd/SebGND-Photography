import React, { Component } from 'react';
import GalleriesList from '../../GalleriesList/GalleriesList';

import Gallery from '../../../helper/Gallery';
import Image from '../../../helper/Image';

const placeHolderImage = new Image(1, 1920 , 1080, new Date());
const placeholderGallery = new Gallery('test', 'Test', placeHolderImage);

interface GalleriesState {
    galleries: Gallery[];
}

class Galleries extends Component {
    state = {
        galleries: [placeholderGallery, 
                    placeholderGallery, 
                    placeholderGallery, 
                    placeholderGallery, 
                    placeholderGallery,
                    placeholderGallery]
    }

    fetchGalleries() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <GalleriesList galleries={this.state.galleries} />
        )
    }
}

export default Galleries;