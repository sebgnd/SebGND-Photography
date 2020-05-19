import React, { FunctionComponent } from 'react';
import Image from '../../helper/image/Image';
import { GalleryButton } from '../UI/Button';

import styles from './GalleryList.module.css';
import Category from '../../helper/category/Category';

interface GalleriesListProps {
    categories: Category[];
}

const GalleriesList: FunctionComponent<GalleriesListProps> = ({ categories }) => {
    return (
        <div className={styles.listContainer}>
            {categories.map(category => {
                return (
                    <div key={category.id} className={styles.galleryButtonContainer}>
                        <GalleryButton
                            src={category.getThumbnailUrl('thumbnail_medium')}
                            imageId={category.thumbnailId.toString()}
                            categoryId={category.id}
                            categoryDisplayName={category.displayName}   
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default GalleriesList;