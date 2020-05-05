import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GalleryButtonContainer, GalleryImage, Img, GalleryName, GalleryButtonWrapper } from './gallery-button-style';
import { Text } from '../../regular/text';
import { ButtonContainer } from '../../regular/container';

import Image from '../../../../helper/Image';
import Paths from '../../../../helper/Paths';

interface IGalleryButtonProp extends RouteComponentProps {
    galleryDisplayName: string;
    galleryName: string;
    image: Image;
}

class GalleryButton extends Component<IGalleryButtonProp, {}> {
    goToGallery(gallery: string) {
        const url = Paths.galleryWithName(this.props.galleryName);
        this.props.history.push(url);
    }

    render() {
        const imageSource = Paths.mediumThumbnailImage(); 

        return (
            <GalleryButtonContainer>
                <GalleryButtonWrapper>
                    <ButtonContainer onClick={() => this.goToGallery(this.props.galleryName)}>

                        <GalleryImage>
                            <Img src={imageSource} alt={this.props.image.getId().toString()} />
                        </GalleryImage>

                        <GalleryName id="gallery-name">
                            <Text size="medium" color="black" weight="normal">{this.props.galleryDisplayName}</Text>
                        </GalleryName>

                    </ButtonContainer>
                </GalleryButtonWrapper>
            </GalleryButtonContainer>
        )
    }
}

export default withRouter(GalleryButton);