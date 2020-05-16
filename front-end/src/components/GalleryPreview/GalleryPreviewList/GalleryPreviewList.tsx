import React, { FunctionComponent } from 'react';
import Image from '../../../helper/image/Image';
import { GalleryButton } from '../../UI/Button';
import styles from './GalleryPreviewList.module.css';

interface GalleryPreviewListProps {
    thumbnails: Image[]
}

const GalleryPreviewList: FunctionComponent<GalleryPreviewListProps> = ({ thumbnails }) => {

    return (
        <div className={styles.listContainer}>
            {thumbnails.map((thumbnail) => {
                return (
                    <div key={thumbnail.id} className={styles.buttonContainer}>
                        <GalleryButton 
                            src={thumbnail.getUrl('thumbnail_medium')}
                            imageId={thumbnail.id.toString()}
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