import React, { FunctionComponent } from 'react';
import Gallery from '../../helper/Gallery';
import { GalleryButton } from '../UI/Button';

import styles from './GalleriesList.module.css';

interface GalleriesListProps {
    galleries: Gallery[];
}

const GalleriesList: FunctionComponent<GalleriesListProps> = ({ galleries }) => {
    return (
        <div className={styles.listContainer}>
            {galleries.map(gallery => {
                return (
                    <div className={styles.galleryButtonContainer}>
                        <GalleryButton gallery={gallery} />
                    </div>
                )
            })}
        </div>
    )
}

export default GalleriesList;