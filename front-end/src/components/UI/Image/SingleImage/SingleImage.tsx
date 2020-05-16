import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ButtonContainer } from '../../../Styled/container';

import styles from './SingleImage.module.css';

import Image from '../../../../helper/image/Image';
import Paths from '../../../../helper/Paths';
import Category from '../../../../helper/category/Category';

interface SingleImageProp extends RouteComponentProps {
    src: string;
    imageId: string;
    categoryId: string;
}

const SingleImage: FunctionComponent<SingleImageProp> = ({ src, imageId, categoryId, history }) => {
    const goToImage = () => {
        history.push(`/viewer/${categoryId}/${imageId}`);
    }

    return (
        <div className={styles.singleImageContainer}>
            <ButtonContainer onClick={() => goToImage()}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={src} alt={imageId}/>
                </div>
            </ButtonContainer>
        </div>
        )
}

export default withRouter(SingleImage);