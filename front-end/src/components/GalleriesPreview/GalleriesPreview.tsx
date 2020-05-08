import React, { FunctionComponent } from 'react';

import { Button } from '../Button';
import GalleryPreviewList from './GalleryPreviewList/GalleryPreviewList';
import { Title } from '../regular/text';
import { GalleriesPreviewContainer, Row, TitleContainer, ButtonContainer } from './galleries-preview.style';

import Gallery from '../../helper/Gallery';
import Image from '../../helper/Image';

interface GalleriesPreviewProps {
    galleries: Gallery[];
}

const GalleriesPreview: FunctionComponent<GalleriesPreviewProps> = (props) => {
    return (
        <GalleriesPreviewContainer>
            <Row>
                <TitleContainer>
                    <Title color="black">Galleries</Title>
                </TitleContainer>
            </Row>
            <Row>
                <GalleryPreviewList galleries={props.galleries} />
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