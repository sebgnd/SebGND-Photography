import React, { FunctionComponent } from 'react';
import Category from '../../../helper/category/Category';
import { GalleryButton } from '../../UI/Button';
import styles from './GalleryPreviewList.module.css';

interface GalleryPreviewListProps {
    categories: Category[]
}

const GalleryPreviewList: FunctionComponent<GalleryPreviewListProps> = ({ categories }) => {
    return (
        <div className={styles.listContainer}>
            {categories.map((category) => {
                return (
                    <div key={category.id} className={styles.buttonContainer}>
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
    );
}

export default GalleryPreviewList;