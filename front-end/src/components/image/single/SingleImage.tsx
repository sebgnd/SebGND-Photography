import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ImageContainer, Img, SingleImageContainer } from './single-style';
import { ButtonContainer } from '../../regular/container';

import Image from '../../../helper/Image';
import Paths from '../../../helper/Paths';

interface ISingleImageProp extends RouteComponentProps {
    // Image information
    image: Image;

    // Gallery information
    galleryName: string;
}

// TODO: Get the right path for the image from files server -> imageSource

class SingleImage extends Component<ISingleImageProp, {}> {
    goToImage(gallery: string, image: Image) {
        const id = image.getId().toString();
        const imageLink = `viewer/${this.props.galleryName}/${id}`;
        this.props.history.push(imageLink);
    }
    render() {
        const { image, galleryName } = this.props;
        const imageSource = Paths.mediumThumbnailImage(); // TODO: Get the right path for the image from files server.

        return (
            <SingleImageContainer>
                <ButtonContainer>
                    <ImageContainer onClick={() => this.goToImage(galleryName, image)}>
                        <Img src={imageSource} alt={image.getId().toString()}/>
                    </ImageContainer>
                </ButtonContainer>
            </SingleImageContainer>
        )
    }
}

export default withRouter(SingleImage);