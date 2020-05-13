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
    const imageSource = Paths.mediumThumbnailImage(image.id, image.galleryId);

    const goToImage = () => {
        props.history.push(`/viewer/${image.galleryId}/${image.id.toString()}`);
    }

    return (
        <div className={styles.singleImageContainer}>
            <ButtonContainer>
                <div className={styles.imageContainer} onClick={() => goToImage()}>
                    <img className={styles.image} src={imageSource} alt={image.id.toString()}/>
                </div>
            </ButtonContainer>
        </div>
        )
}

export default withRouter(SingleImage);