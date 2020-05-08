import React, { FunctionComponent } from 'react';
import Gallery from '../../../helper/Gallery';
import { GalleryButton } from '../../UI/Button';
import styles from './GalleriesPreviewList.module.css';

interface GalleryPreviewListProps {
    galleries: Gallery[]
}

const GalleryPreviewList: FunctionComponent<GalleryPreviewListProps> = ({ galleries }) => {

    return (
        <div className={styles.listContainer}>
            {galleries.map((gallery) => {
                return (
                    <div key={gallery.getId()} className={styles.buttonContainer}>
                        <GalleryButton gallery={gallery} />
                    </div>
                )
            })}
        </div>
    );
}

export default GalleryPreviewList;