import React, { FunctionComponent } from 'react';
import GalleryPreview from '../../../helper/gallery/GalleryPreview';
import { GalleryButton } from '../../UI/Button';
import styles from './GalleriesPreviewList.module.css';

interface GalleryPreviewListProps {
    galleries: GalleryPreview[]
}

const GalleryPreviewList: FunctionComponent<GalleryPreviewListProps> = ({ galleries }) => {

    return (
        <div className={styles.listContainer}>
            {galleries.map((gallery) => {
                return (
                    <div key={gallery.category.id} className={styles.buttonContainer}>
                        <GalleryButton category={gallery.category} image={gallery.thumbnail} />
                    </div>
                )
            })}
        </div>
    );
}

export default GalleryPreviewList;