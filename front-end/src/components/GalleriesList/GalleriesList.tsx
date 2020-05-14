import React, { FunctionComponent } from 'react';
import GalleryPreview from '../../helper/gallery/GalleryPreview';
import { GalleryButton } from '../UI/Button';

import styles from './GalleriesList.module.css';

interface GalleriesListProps {
    galleries: GalleryPreview[];
}

const GalleriesList: FunctionComponent<GalleriesListProps> = ({ galleries }) => {
    return (
        <div className={styles.listContainer}>
            {galleries.map(gallery => {
                return (
                    <div key={gallery.id} className={styles.galleryButtonContainer}>
                        <GalleryButton key={gallery.id} image={gallery.thumbnail} category={gallery.category} />
                    </div>
                )
            })}
        </div>
    )
}

export default GalleriesList;