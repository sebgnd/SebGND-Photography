import React, { FunctionComponent } from 'react';
import Image from '../../helper/image/Image';
import { GalleryButton } from '../UI/Button';

import styles from './GalleryList.module.css';

interface GalleriesListProps {
    thumbnails: Image[];
}

const GalleriesList: FunctionComponent<GalleriesListProps> = ({ thumbnails }) => {
    return (
        <div className={styles.listContainer}>
            {thumbnails.map(thumbnail => {
                return (
                    <div key={thumbnail.id} className={styles.galleryButtonContainer}>
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
    )
}

export default GalleriesList;