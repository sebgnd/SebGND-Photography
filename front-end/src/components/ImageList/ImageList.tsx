import React, { FunctionComponent, Fragment } from 'react';
import { SingleImage } from '../UI/Image';
import GalleryTitle from './GalleryTitle/GalleryTitle';

import Image from '../../helper/Image';
import Gallery from '../../helper/Gallery';

import styles from './ImageList.module.css';

interface ImageListProps {
    images: Image[];
    galleryDisplayName: string;
}

const ImageList: FunctionComponent<ImageListProps> = ({ images, galleryDisplayName }) => {
    return (
        <Fragment>
            <GalleryTitle title={galleryDisplayName} />
            <div className={styles.listContainer}>
                {images.map(image => {
                    return <SingleImage key={image.getId()} image={image}/>
                })}
            </div>
        </Fragment>
    )
}

export default ImageList;