import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ButtonContainer } from '../../../Styled/container';

import styles from './SingleImage.module.css';

import Image from '../../../../helper/Image';
import Gallery from '../../../../helper/Gallery';
import Paths from '../../../../helper/Paths';

interface SingleImageProp extends RouteComponentProps {
    image: Image;
}

const SingleImage: FunctionComponent<SingleImageProp> = (props) => {
    const { image } = props;
    const imageSource = Paths.mediumThumbnailImage(image.getId(), image.getGalleryId());

    const goToImage = () => {
        const id = image.getId().toString();
        const gallertId = image.getGalleryId();
        const imageLink = `/viewer/${gallertId}/${id}`;
        props.history.push(imageLink);
    }

    return (
        <div className={styles.singleImageContainer}>
            <ButtonContainer>
                <div className={styles.imageContainer} onClick={() => goToImage()}>
                    <img className={styles.image} src={imageSource} alt={image.getId().toString()}/>
                </div>
            </ButtonContainer>
        </div>
        )
}

export default withRouter(SingleImage);