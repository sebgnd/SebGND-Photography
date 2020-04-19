import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './image.css';
import Image from '../../../data/Image';
import Paths from '../../../data/Paths';

type SingleImageProp = {
    // Image information
    image: Image;

    // Gallery information
    galleryName: string;
}

// TODO: Get the right path for the image from files server -> imageSource

class SingleImage extends Component<SingleImageProp, {}> {
    render() {
        // Image information
        const id = this.props.image.getId().toString();

        // Links to other pages
        const imageLink = `viewer/${this.props.galleryName}/${id}`;
        const imageSource = Paths.mediumThumbnailImage(); // TODO: Get the right path for the image from files server.

        return (
            <div className="single-image">
                <Link to={imageLink}>
                    <img src={imageSource} alt={id} />
                </Link>
            </div>
        )
    }
}

export default SingleImage;