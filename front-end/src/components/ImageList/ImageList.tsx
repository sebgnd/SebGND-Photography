import React, { FunctionComponent, Fragment } from 'react';
import { SingleImage } from '../UI/Image';
import GalleryTitle from './GalleryTitle/GalleryTitle';

import Image from '../../helper/Image';
import Gallery from '../../helper/Gallery';

import styles from './ImageList.module.css';

interface ImageListProps {
    images: Image[];
    gallery: Gallery;
}

const ImageList: FunctionComponent<ImageListProps> = ({ images, gallery }) => {
    return (
        <Fragment>
            <GalleryTitle title={gallery.getDisplayName()} />
            <div className={styles.listContainer}>
                {images.map(image => {
                    return <SingleImage image={image} gallery={gallery}/>
                })}
            </div>
        </Fragment>
    )
}

export default ImageList;