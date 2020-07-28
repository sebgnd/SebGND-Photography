import React, { FunctionComponent } from 'react';
import { GalleryButton } from '../../../../UI/Button';
import styles from './GalleryPreviewList.module.css';

import CategoryThumbnail from '../../../../../helper/category/CategoryThumbnail';
import CategoryService from '../../../../../helper/category/CategoryService';

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
                            src={CategoryService.getThumbnailUrl(thumbnail, 'thumbnail_medium')}
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