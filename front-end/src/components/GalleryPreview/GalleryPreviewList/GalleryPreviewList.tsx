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
                        <GalleryButton image={thumbnail} />
                    </div>
                )
            })}
        </div>
    );
}

export default GalleryPreviewList;