import React, { FunctionComponent, MouseEvent } from 'react';
import { RecentImage } from '../../../UI/Image';

import Image from '../../../../helper/image/Image';
import ImageService from '../../../../helper/image/ImageService';

import styles from './RecentList.module.css';

interface RecentListProp {
    images: Image[];
    onImageClick: (event: MouseEvent, imageId: string) => void;
    onGalleryClick: (event: MouseEvent, categoryId: string) => void;
}

const RecentList: FunctionComponent<RecentListProp> = ({ images, onImageClick, onGalleryClick }) => {
    return (
        <div className={styles.recentListContainer}>
            { images.map(image => {
                return (
                    <RecentImage 
                        key={image.id} 
                        src={ImageService.getUrl(image, 'small_res')} 
                        date={ImageService.getFormatedDate(image)} 
                        imageType={ImageService.getImageType(image)} 
                        imageId={image.id.toString()} 
                        categoryId={image.category.id} 
                        categoryDisplayName={image.category.displayName}
                        onImageClick={onImageClick}
                        onGalleryClick={onGalleryClick}
                    />
                )
            }) }
        </div>
    )
}

export default RecentList;