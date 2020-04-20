import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paths from '../../../../data/Paths';
import Image from './../../../../data/Image';

import './image.css';

type RecentImageProp = {
    // Image information
    image: Image;

    // Gallery information
    galleryDisplayName: string;
    galleryName: string;
}

// TODO: Change imageType to a enum ImageType, overkill ?
// TODO: Figure out if image is landscape or portrait
// TODO: Get the right path for the image from files server -> imageSource

class RecentImage extends Component<RecentImageProp, {}> {
    render() {
        // Image information
        const formatedDate = this.props.image.getFormatedDate();
        const id = this.props.image.getId().toString();
        const imageType = this.props.image.isPortrait() ? 'portrait' : 'landscape';
        
        // Links to other pages
        const galleryLink = `gallery/${this.props.galleryName}`;
        const imageLink = `viewer/${this.props.galleryName}/${id}`;
        const imageSource = Paths.smallImage();
        
        return (
            <div className="recent-image-container">
                <div className="info">
                    <Link className="category" to={galleryLink}>{this.props.galleryDisplayName}</Link>
                    <h3 className="date">{formatedDate}</h3>
                </div>
                <div className="image">
                    <Link to={imageLink}>
                        { this.props.image.isPortrait() && (
                                <img className={`${imageType}-fill`} src={imageSource} alt={id}></img>
                            )}
                        <img className={imageType} src={imageSource} alt={id}/>
                    </Link>
                </div>
            </div>
        )
    }
}

export default RecentImage;