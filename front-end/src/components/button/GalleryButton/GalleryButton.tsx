import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GalleryButtonContainer, GalleryImage, Img, GalleryName, GalleryButtonWrapper } from './gallery-button-style';
import { Text } from '../../regular/text';
import { ButtonContainer } from '../../regular/container';

import Image from '../../../helper/Image';
import Paths from '../../../helper/Paths';
import Gallery from '../../../helper/Gallery';

interface GalleryButtonProp extends RouteComponentProps {
    gallery: Gallery;
    image: Image;
}

const GalleryButton: FunctionComponent<GalleryButtonProp> = (props) => {
    const imageSource = Paths.mediumThumbnailImage(); 
    const { gallery, image } = props;

    const goToGallery = () => {
        const url = Paths.galleryWithId(gallery.getId());
        props.history.push(url);
    }

    return (
        <GalleryButtonContainer>
            <GalleryButtonWrapper>
                <ButtonContainer onClick={() => goToGallery()}>

                    <GalleryImage>
                        <Img src={imageSource} alt={image.getId().toString()} />
                    </GalleryImage>

                    <GalleryName id="gallery-name">
                        <Text size="medium" color="black" weight="normal">{gallery.getDisplayName()}</Text>
                    </GalleryName>

                </ButtonContainer>
            </GalleryButtonWrapper>
        </GalleryButtonContainer>
    )
}

export default withRouter(GalleryButton);