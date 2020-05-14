import React, { FunctionComponent } from 'react';
import GalleryThumbnail from '../../../helper/gallery/GalleryThumbnail';
import { GalleryButton } from '../../UI/Button';
import styles from './GalleriesPreviewList.module.css';

interface GalleryPreviewListProps {
    thumbnails: GalleryThumbnail[]
}

const GalleryPreviewList: FunctionComponent<GalleryPreviewListProps> = ({ thumbnails }) => {

    return (
        <div className={styles.listContainer}>
            {thumbnails.map((thumbnail) => {
                return (
                    <div key={thumbnail.id} className={styles.buttonContainer}>
                        <GalleryButton image={thumbnail.image} category={thumbnail.category} />
                    </div>
                )
            })}
        </div>
    );
}

export default GalleryPreviewList;