import React, { FunctionComponent } from 'react';

import { GalleryButton, Button } from '../Button';
import { Title } from '../regular/text';
import { GalleriesPreviewContainer, Row, TitleContainer, ButtonContainer } from './galleries-preview.style';

import Gallery from '../../helper/Gallery';
import Image from '../../helper/Image';

const GalleriesPreview: FunctionComponent = () => {
    const placeholderImage = new Image(1, 1080, 1920, new Date());
    const placeholderGallery = new Gallery("test", "Test");
    return (
        <GalleriesPreviewContainer>
            <Row>
                <TitleContainer>
                    <Title color="black">Galleries</Title>
                </TitleContainer>
            </Row>
            <Row>
                <GalleryButton gallery={placeholderGallery} image={placeholderImage} />
                <GalleryButton gallery={placeholderGallery} image={placeholderImage} />
                <GalleryButton gallery={placeholderGallery} image={placeholderImage} />
            </Row>
            <Row>
                <ButtonContainer>
                    <Button size="medium" variant="classic" onClick={() => {}}>See all galleries</Button>
                </ButtonContainer>
            </Row>
        </GalleriesPreviewContainer>
    )
}

export default GalleriesPreview;