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
                    <div key={gallery.id} className={styles.galleryButtonContainer}>
                        <GalleryButton key={gallery.id} gallery={gallery}/>
                    </div>
                )
            })}
        </div>
    )
}

export default GalleriesList;