import React, { FunctionComponent, Fragment } from 'react';
import { SingleImage } from '../UI/Image';
import GalleryTitle from './GalleryTitle/GalleryTitle';

import styles from './ImageList.module.css';

import Image from '../../helper/image/Image';
import Category from '../../helper/Category';

interface ImageListProps {
    images: Image[];
    category: Category;
}

const ImageList: FunctionComponent<ImageListProps> = ({ images, category }) => {
    return (
        <Fragment>
            <GalleryTitle title={category.displayName} />
            <div className={styles.listContainer}>
                {images.map(image => {
                    return <SingleImage key={image.id} image={image}/>
                })}
            </div>
        </Fragment>
    )
}

export default ImageList;