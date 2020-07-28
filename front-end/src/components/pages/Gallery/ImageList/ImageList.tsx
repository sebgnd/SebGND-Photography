import React, { FunctionComponent, Fragment, MouseEvent } from 'react';
import { SingleImage } from '../../../UI/Image';
import GalleryTitle from './GalleryTitle/GalleryTitle';

import styles from './ImageList.module.css';

import Image from '../../../../helper/image/Image';
import ImageService from '../../../../helper/image/ImageService';
import Category from '../../../../helper/category/Category';

interface ImageListProps {
    images: Image[];
    category: Category;
    onImageClick: (event: MouseEvent, imageId: string, categoryId: string) => void;
}

const ImageList: FunctionComponent<ImageListProps> = ({ images, category, onImageClick }) => {
    return (
        <Fragment>
            <GalleryTitle title={category.displayName} />
            <div className={styles.listContainer}>
                {images.map(image => {
                    return <SingleImage 
                                key={image.id} 
                                src={ImageService.getUrl(image, 'thumbnail_medium')} 
                                imageId={image.id.toString()}
                                categoryId={image.category.id}
                                onClick={onImageClick}
                            />
                })}
            </div>
        </Fragment>
    )
}

export default ImageList;