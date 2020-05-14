import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Text } from '../../../Styled/text';
import { ButtonContainer } from '../../../Styled/container';

import styles from './GalleryButton.module.css';

import Paths from '../../../../helper/Paths';
import Image from '../../../../helper/image/Image';
import Category from '../../../../helper/Category';

interface GalleryButtonProp extends RouteComponentProps {
    image: Image;
    category: Category;
}

const GalleryButton: FunctionComponent<GalleryButtonProp> = (props) => {
    const { category, image } = props;
    const imageSource = Paths.mediumThumbnailImage(image.id, category.id); 

    const goToGallery = () => {
        const url = Paths.galleryWithId(category.id);
        props.history.push(url);
    }

    return (
        <div className={styles.galleryButtonContainer}>
            <div className={styles.galleryButtonWrapper}>
                <ButtonContainer onClick={() => goToGallery()}>
                    <div className={styles.galleryImage}>
                        <img className={styles.image} src={imageSource} alt={image.id.toString()} />
                    </div>

                    <div id="gallery-name" className={styles.galleryName}>
                        <Text size="medium" color="black" weight="normal">{category.displayName}</Text>
                    </div>

                </ButtonContainer>
            </div>
        </div>
    )
}

export default withRouter(GalleryButton);