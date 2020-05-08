import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ButtonContainer } from '../../Styled/container';

import styles from './SingleImage.module.css';

import Image from '../../../helper/Image';
import Gallery from '../../../helper/Gallery';
import Paths from '../../../helper/Paths';

interface SingleImageProp extends RouteComponentProps {
    image: Image;
    gallery: Gallery;
}

const SingleImage: FunctionComponent<SingleImageProp> = (props) => {
    const { image, gallery } = props;
    const imageSource = Paths.mediumThumbnailImage();

    const goToImage = () => {
        const id = image.getId().toString();
        const imageLink = `viewer/${gallery.getId()}/${id}`;
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