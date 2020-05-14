import React, { FunctionComponent } from 'react';
import GalleryThumbnail from '../../helper/gallery/GalleryThumbnail';
import { GalleryButton } from '../UI/Button';

import styles from './GalleriesList.module.css';

interface GalleriesListProps {
    thumbnails: GalleryThumbnail[];
}

const GalleriesList: FunctionComponent<GalleriesListProps> = ({ thumbnails }) => {
    return (
        <div className={styles.listContainer}>
            {thumbnails.map(thumbnail => {
                return (
                    <div key={thumbnail.id} className={styles.galleryButtonContainer}>
                        <GalleryButton key={thumbnail.id} image={thumbnail.image} category={thumbnail.category} />
                    </div>
                )
            })}
        </div>
    )
}

export default GalleriesList;