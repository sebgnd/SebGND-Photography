import React, { FunctionComponent } from 'react';
import Image from '../../helper/image/Image';
import { GalleryButton } from '../UI/Button';

import styles from './GalleryList.module.css';
import Category from '../../helper/category/Category';
import CategoryThumbnail from '../../helper/category/CategoryThumbnail';

interface GalleriesListProps {
    thumbnails: CategoryThumbnail[];
}

const GalleriesList: FunctionComponent<GalleriesListProps> = ({ thumbnails }) => {
    return (
        <div className={styles.listContainer}>
            {thumbnails.map(thumbnail => {
                return (
                    <div key={thumbnail.category.id} className={styles.galleryButtonContainer}>
                        <GalleryButton
                            src={thumbnail.getUrl('thumbnail_medium')}
                            imageId={thumbnail.image ? thumbnail.image.id.toString() : '-1'}
                            categoryId={thumbnail.category.id}
                            categoryDisplayName={thumbnail.category.displayName}   
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default GalleriesList;