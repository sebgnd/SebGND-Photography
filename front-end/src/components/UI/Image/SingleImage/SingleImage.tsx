import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ButtonContainer } from '../../../Styled/container';

import styles from './SingleImage.module.css';

import Image from '../../../../helper/image/Image';
import Paths from '../../../../helper/Paths';
import Category from '../../../../helper/category/Category';

interface SingleImageProp extends RouteComponentProps {
    image: Image;
}

const SingleImage: FunctionComponent<SingleImageProp> = ({ image, history }) => {
    const categoryId = image.category.id;
    const imageSource = image.getUrl('thumbnail_medium');

    const goToImage = () => {
        history.push(`/viewer/${categoryId}/${image.id.toString()}`);
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