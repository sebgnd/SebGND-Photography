import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Text } from '../../../Styled/text';
import { ButtonContainer } from '../../../Styled/container';

import styles from './GalleryButton.module.css';

import Paths from '../../../../helper/Paths';
import Image from '../../../../helper/image/Image';
import Category from '../../../../helper/category/Category';

interface GalleryButtonProp extends RouteComponentProps {
    image: Image;
}

const GalleryButton: FunctionComponent<GalleryButtonProp> = ({ image, history }) => {
    const imageSource = image.getUrl('thumbnail_medium'); 

    const goToGallery = () => {
        const url = Paths.galleryWithId(image.category.id);
        history.push(url);
    }

    return (
        <div className={styles.galleryButtonContainer}>
            <div className={styles.galleryButtonWrapper}>
                <ButtonContainer onClick={() => goToGallery()}>
                    <div className={styles.galleryImage}>
                        <img className={styles.image} src={imageSource} alt={image.id.toString()} />
                    </div>

                    <div id="gallery-name" className={styles.galleryName}>
                        <Text size="medium" color="black" weight="normal">{image.category.displayName}</Text>
                    </div>

                </ButtonContainer>
            </div>
        </div>
    )
}

export default withRouter(GalleryButton);