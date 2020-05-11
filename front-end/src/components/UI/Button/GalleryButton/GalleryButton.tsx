import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Text } from '../../../Styled/text';
import { ButtonContainer } from '../../../Styled/container';

import styles from './GalleryButton.module.css';

import Paths from '../../../../helper/Paths';
import Gallery from '../../../../helper/Gallery';
import Image from '../../../../helper/Image';

interface GalleryButtonProp extends RouteComponentProps {
    gallery: Gallery;
}

const GalleryButton: FunctionComponent<GalleryButtonProp> = (props) => {
    const { gallery } = props;
    const imageSource = Paths.mediumThumbnailImage(gallery.getThumbnail().getId(), gallery.getId()); 

    const goToGallery = () => {
        const url = Paths.galleryWithId(gallery.getId());
        props.history.push(url);
    }

    return (
        <div className={styles.galleryButtonContainer}>
            <div className={styles.galleryButtonWrapper}>
                <ButtonContainer onClick={() => goToGallery()}>
                    <div className={styles.galleryImage}>
                        <img className={styles.image} src={imageSource} alt={gallery.getThumbnail().getId().toString()} />
                    </div>

                    <div id="gallery-name" className={styles.galleryName}>
                        <Text size="medium" color="black" weight="normal">{gallery.getDisplayName()}</Text>
                    </div>

                </ButtonContainer>
            </div>
        </div>
    )
}

export default withRouter(GalleryButton);