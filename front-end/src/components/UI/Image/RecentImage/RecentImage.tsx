import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Paths from '../../../../helper/Paths';
import Image from '../../../../helper/image/Image';
import ImageWithCategory from '../../../../helper/image/ImageWithCategory';

import AdaptedImage from './AdaptedImage';
import { Text } from '../../../Styled/text';
import { ButtonContainerWidthWidth } from '../../../Styled/container';
import { Button } from '../../Button';

import styles from './RecentImage.module.css';
import Category from '../../../../helper/Category';

interface RecentImageProp extends RouteComponentProps {
    image: Image;
    category: Category;
}

const RecentImage: FunctionComponent<RecentImageProp> = (props) => {
    const goToGallery = (id: string) => {
        props.history.push(`gallery/${id}`);
    }

    const goToImage = (id: number, fromGallery: string) => {
        props.history.push(`viewer/${fromGallery}/${id.toString()}`);
    }

    const { image, category } = props;
    const formattedDate: string = image.getFormatedDate();
    const imageType: string = image.isPortrait() ? 'portrait' : 'landscape';
    const imageSource = Paths.smallImage();
    
    return (
        <div className={styles.recentImageContainer}>
            <div className={styles.info}>
                <div className={styles.infoContainer}>
                    <div className={styles.galleryName}>
                        <Button variant="light" size="small" onClick={() => goToGallery(category.id)}>{category.displayName}</Button>
                    </div>
                </div>

                <div className={styles.infoContainer}>
                    <div className={styles.date}>
                        <Text size="small" color="#7E7E7E" weight="bold">{formattedDate}</Text>
                    </div>
                </div>
            </div>
            
            <div className={styles.imageContainer}>
                <ButtonContainerWidthWidth width="100%" onClick={() => goToImage(image.id, category.id)}>
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