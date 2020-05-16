import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Paths from '../../../../helper/Paths';
import Image from '../../../../helper/image/Image';

import AdaptedImage from './AdaptedImage';
import { Text } from '../../../Styled/text';
import { ButtonContainerWidthWidth } from '../../../Styled/container';
import { Button } from '../../Button';

import styles from './RecentImage.module.css';
import Category from '../../../../helper/category/Category';
import { StringNullableChain } from 'lodash';

interface RecentImageProp extends RouteComponentProps {
    date: string;
    src: string;
    imageType: string;
    imageId: string;
    categoryId: string;
    categoryDisplayName: string;
}

const RecentImage: FunctionComponent<RecentImageProp> = ({ src, date, imageType, imageId, categoryId, categoryDisplayName, history }) => {
    const goToGallery = () => {
        history.push(`gallery/${categoryId}`);
    }

    const goToImage = () => {
        history.push(`viewer/${categoryId}/${imageId}`);
    }

    const isPortrait = imageType == 'portrait';
    
    return (
        <div className={styles.recentImageContainer}>
            <div className={styles.info}>
                <div className={styles.infoContainer}>
                    <div className={styles.galleryName}>
                        <Button variant="light" size="small" onClick={() => goToGallery()}>{categoryDisplayName}</Button>
                    </div>
                </div>

                <div className={styles.infoContainer}>
                    <div className={styles.date}>
                        <Text size="small" color="#7E7E7E" weight="bold">{date}</Text>
                    </div>
                </div>
            </div>
            
            <div className={styles.imageContainer}>
                <ButtonContainerWidthWidth width="100%" onClick={() => goToImage()}>
                    { isPortrait && (
                        <img className={styles.fillerImage} src={src} alt={imageId} />
                    )}
                    <AdaptedImage type={imageType} src={src} alt={imageId} />
                </ButtonContainerWidthWidth>
            </div>
        </div>
    )
}

export default withRouter(RecentImage);