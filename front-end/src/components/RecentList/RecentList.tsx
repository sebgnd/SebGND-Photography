import React, { FunctionComponent, MouseEvent } from 'react';
import Image from '../../helper/image/Image';
import { RecentImage } from '../UI/Image';
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
                return <RecentImage 
                            key={image.id} 
                            src={image.getUrl('small_res')} 
                            date={image.getFormatedDate()} 
                            imageType={image.getImageType()} 
                            imageId={image.id.toString()} 
                            categoryId={image.category.id} 
                            categoryDisplayName={image.category.displayName}
                            onImageClick={onImageClick}
                            onGalleryClick={onGalleryClick}
                        />
            }) }
        </div>
    )
}

export default RecentList;