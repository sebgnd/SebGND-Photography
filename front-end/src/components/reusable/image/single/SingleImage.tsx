import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { SingleImageContainer, Img } from './single-style';

import Image from '../../../../data/Image';
import Paths from '../../../../data/Paths';

type SingleImageProp = RouteComponentProps & {
    // Image information
    image: Image;

    // Gallery information
    galleryName: string;
}

// TODO: Get the right path for the image from files server -> imageSource

class SingleImage extends Component<SingleImageProp, {}> {
    goToImage(gallery: string, image: Image) {
        const id = image.getId().toString();
        const imageLink = `viewer/${this.props.galleryName}/${id}`;
        this.props.history.push(imageLink);
    }
    render() {
        const { image, galleryName } = this.props;
        const imageSource = Paths.mediumThumbnailImage(); // TODO: Get the right path for the image from files server.

        return (
            <SingleImageContainer onClick={() => this.goToImage(galleryName, image)}>
                <Img src={imageSource} alt={image.getId().toString()}/>
            </SingleImageContainer>
        )
    }
}

export default withRouter(SingleImage);