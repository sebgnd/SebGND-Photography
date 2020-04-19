import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Image from '../../../data/Image';
import Paths from '../../../data/Paths';

import './gallery-button.css';

type GalleryButtonProp = {
    galleryDisplayName: string;
    galleryName: string;
    image: Image;
}

class GalleryButton extends Component<GalleryButtonProp, {}> {
    render() {
        const imageSource = Paths.mediumThumbnailImage(); 
        const to = Paths.galleryWithName(this.props.galleryName);

        return (
            <div className="gallery-button-container">
                <div className="gallery-button">
                    <Link to={to}>
                        <div className="gallery-image-container">
                            <img src={imageSource} alt={this.props.image.getId().toString()}/>
                        </div>
                        <div className="gallery-name">
                            <p>{this.props.galleryDisplayName}</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default GalleryButton;