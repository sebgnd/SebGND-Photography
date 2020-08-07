import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Text } from '../../../Styled/text';
import { ButtonContainer } from '../../../Styled/container';
import ImageFade from '../../Image/ImageFade/ImageFade';

import styles from './GalleryButton.module.css';

import Paths from '../../../../helper/Paths';

interface GalleryButtonProp extends RouteComponentProps {
    src: string;
    imageId: string;
    categoryId: string;
    categoryDisplayName: string;
}

const GalleryButton: FunctionComponent<GalleryButtonProp> = ({ src, imageId, categoryId, categoryDisplayName, history }) => {
    const goToGallery = () => {
        const url = Paths.galleryWithId(categoryId);
        history.push(url);
    }

    return (
        <div className={styles.galleryButtonContainer}>
            <div className={styles.galleryButtonWrapper}>
                <ButtonContainer onClick={() => goToGallery()}>
                    <div className={styles.galleryImage}>
                        <ImageFade className={styles.image} src={src} alt={imageId} />
                    </div>

                    <div id="gallery-name" className={styles.galleryName}>
                        <Text size="medium" color="black" weight="normal">{categoryDisplayName}</Text>
                    </div>

                </ButtonContainer>
            </div>
        </div>
    )
}

export default withRouter(GalleryButton);