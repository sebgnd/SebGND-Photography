import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GalleryButtonContainer, GalleryButtonWrapper, GalleryImage, Img, GalleryNameContainer, GalleryName } from './gallery-button-style';
import { Text } from '../regular/style';

import Image from '../../../data/Image';
import Paths from '../../../data/Paths';

type GalleryButtonProp = RouteComponentProps & {
    galleryDisplayName: string;
    galleryName: string;
    image: Image;
}

class GalleryButton extends Component<GalleryButtonProp, {}> {
    goToGallery(gallery: string) {
        const url = Paths.galleryWithName(this.props.galleryName);
        this.props.history.push(url);
    }

    render() {
        const imageSource = Paths.mediumThumbnailImage(); 

        return (
            <GalleryButtonWrapper>
                <GalleryButtonContainer onClick={() => this.goToGallery(this.props.galleryName)}>
                    <GalleryImage>
                        <Img src={imageSource} alt={this.props.image.getId().toString()} />
                    </GalleryImage>
                    <GalleryNameContainer>
                        <GalleryName>
                            <Text size="medium" color="black" weight="normar">{this.props.galleryDisplayName}</Text>
                        </GalleryName>
                    </GalleryNameContainer>
                </GalleryButtonContainer>
            </GalleryButtonWrapper>
        )
    }
}

export default withRouter(GalleryButton);