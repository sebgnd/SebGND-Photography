import React, { FunctionComponent } from 'react';
import Image from '../../helper/image/Image';
import { GalleryButton } from '../UI/Button';

import styles from './GalleriesList.module.css';

interface GalleriesListProps {
    thumbnails: Image[];
}

const GalleriesList: FunctionComponent<GalleriesListProps> = ({ thumbnails }) => {
    return (
        <div className={styles.listContainer}>
            {thumbnails.map(thumbnail => {
                return (
                    <div key={thumbnail.id} className={styles.galleryButtonContainer}>
                        <GalleryButton key={thumbnail.id} image={thumbnail} />
                    </div>
                )
            })}
        </div>
    )
}

export default GalleriesList;