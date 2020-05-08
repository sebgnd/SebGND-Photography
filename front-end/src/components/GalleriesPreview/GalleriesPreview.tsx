import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom'
 
import { Button } from '../Button';
import GalleryPreviewList from './GalleryPreviewList/GalleryPreviewList';
import { Title } from '../regular/text';
import { GalleriesPreviewContainer, Row, TitleContainer, ButtonContainer } from './galleries-preview.style';

import Gallery from '../../helper/Gallery';
import Paths from '../../helper/Paths';
import Image from '../../helper/Image';

interface GalleriesPreviewProps extends RouteComponentProps {
    galleries: Gallery[];
}

const GalleriesPreview: FunctionComponent<GalleriesPreviewProps> = (props) => {
    const goToGalleries = () => {
        const galleriesLink = Paths.gallery();
        props.history.push(galleriesLink);
    }

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
                    <Button size="medium" variant="classic" onClick={goToGalleries}>See all galleries</Button>
                </ButtonContainer>
            </Row>
        </GalleriesPreviewContainer>
    )
}

export default withRouter(GalleriesPreview);