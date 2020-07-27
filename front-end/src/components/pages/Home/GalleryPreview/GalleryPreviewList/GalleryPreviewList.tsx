import React, { FunctionComponent } from 'react';
import Category from '../../../../../helper/category/Category';
import { GalleryButton } from '../../../../UI/Button';
import styles from './GalleryPreviewList.module.css';
import CategoryThumbnail from '../../../../../helper/category/CategoryThumbnail';

interface GalleryPreviewListProps {
    thumbnails: CategoryThumbnail[]
}

const GalleryPreviewList: FunctionComponent<GalleryPreviewListProps> = ({ thumbnails }) => {
    return (
        <div className={styles.listContainer}>
            {thumbnails.map((thumbnail) => {
                return (
                    <div key={thumbnail.category.id} className={styles.buttonContainer}>
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
    );
}

export default GalleryPreviewList;