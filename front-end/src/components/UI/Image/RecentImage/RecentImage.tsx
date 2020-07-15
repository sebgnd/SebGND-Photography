import React, { FunctionComponent, MouseEvent } from 'react';

import Paths from '../../../../helper/Paths';
import Image from '../../../../helper/image/Image';

import AdaptedImage from './AdaptedImage';
import { Text } from '../../../Styled/text';
import { ButtonContainerWidthWidth } from '../../../Styled/container';
import { Button } from '../../Button';

import styles from './RecentImage.module.css';
import Category from '../../../../helper/category/Category';

interface RecentImageProp {
    date: string;
    src: string;
    imageType: string;
    imageId: string;
    categoryId: string;
    categoryDisplayName: string;
    onImageClick: (event: MouseEvent, imageId: string) => void;
    onGalleryClick: (event: MouseEvent, categoryId: string) => void;
}

const RecentImage: FunctionComponent<RecentImageProp> = ({ src, date, imageType, imageId, categoryId, categoryDisplayName, onImageClick, onGalleryClick }) => {
    const isPortrait = imageType === 'portrait';
    
    return (
        <div className={styles.recentImageContainer}>
            <div className={styles.info}>
                <div className={styles.infoContainer}>
                    <div className={styles.galleryName}>
                        <Button variant="light" size="small" onClick={(event) => onGalleryClick(event, categoryId)} label={categoryDisplayName} />
                    </div>
                </div>

                <div className={styles.infoContainer}>
                    <div className={styles.date}>
                        <Text size="small" color="#7E7E7E" weight="bold">{date}</Text>
                    </div>
                </div>
            </div>
            
            <div className={styles.imageContainer}>
                <ButtonContainerWidthWidth width="100%" onClick={(event) => onImageClick(event, imageId)}>
                    { isPortrait && (
                        <img className={styles.fillerImage} src={src} alt={imageId} />
                    )}
                    <AdaptedImage type={imageType} src={src} alt={imageId} />
                </ButtonContainerWidthWidth>
            </div>
        </div>
    )
}

export default RecentImage;