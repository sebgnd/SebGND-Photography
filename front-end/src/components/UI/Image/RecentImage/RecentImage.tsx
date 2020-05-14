import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Paths from '../../../../helper/Paths';
import Image from '../../../../helper/image/Image';

import AdaptedImage from './AdaptedImage';
import { Text } from '../../../Styled/text';
import { ButtonContainerWidthWidth } from '../../../Styled/container';
import { Button } from '../../Button';

import styles from './RecentImage.module.css';
import Category from '../../../../helper/Category';

interface RecentImageProp extends RouteComponentProps {
    image: Image;
}

const RecentImage: FunctionComponent<RecentImageProp> = ({ image, history }) => {
    const goToGallery = (id: string) => {
        history.push(`gallery/${id}`);
    }

    const goToImage = (id: number, fromCategory: string) => {
        history.push(`viewer/${fromCategory}/${id.toString()}`);
    }

    const formattedDate: string = image.getFormatedDate();
    const imageType: string = image.isPortrait() ? 'portrait' : 'landscape';
    const imageSource = Paths.smallImage(image.id, image.category.id);
    
    return (
        <div className={styles.recentImageContainer}>
            <div className={styles.info}>
                <div className={styles.infoContainer}>
                    <div className={styles.galleryName}>
                        <Button variant="light" size="small" onClick={() => goToGallery(image.category.id)}>{image.category.displayName}</Button>
                    </div>
                </div>

                <div className={styles.infoContainer}>
                    <div className={styles.date}>
                        <Text size="small" color="#7E7E7E" weight="bold">{formattedDate}</Text>
                    </div>
                </div>
            </div>
            
            <div className={styles.imageContainer}>
                <ButtonContainerWidthWidth width="100%" onClick={() => goToImage(image.id, image.category.id)}>
                    { image.isPortrait() && (
                        <img className={styles.fillerImage} src={imageSource} alt={image.id.toString()} />
                    )}
                    <AdaptedImage type={imageType} src={imageSource} alt={image.id.toString()} />
                </ButtonContainerWidthWidth>
            </div>
        </div>
    )
}

export default withRouter(RecentImage);