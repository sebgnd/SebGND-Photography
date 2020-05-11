import React, { FunctionComponent } from 'react';
import Image from '../../helper/Image';
import { SingleImage } from '../UI/Image';

import styles from './ImageList.module.css';

interface ImageListProps {
    images: Image[];
}

const ImageList: FunctionComponent<ImageListProps> = ({ images }) => {
    return (
        <div className={styles.listContainer}>
            {images.map(image => {
                return <SingleImage image={image}/>
            })}
        </div>
    )
}

export default ImageList;