import React, { FunctionComponent, Fragment, MouseEvent } from 'react';

import { SingleImage } from '../../../UI/Image';
import GalleryTitle from './GalleryTitle/GalleryTitle';
import Spinner from '../../../UI/Spinner/Spinner';
import styles from './ImageList.module.css';
import InformationMessage from '../../../UI/InformationMessage/InformationMessage';

import Image from '../../../../helper/image/Image';
import ImageService from '../../../../helper/image/ImageService';
import Category from '../../../../helper/category/Category';

interface ImageListProps {
    images: Image[];
    category: Category | null;
    onImageClick: (event: MouseEvent, imageId: string, categoryId: string) => void;
    categoryStatus: string;
    imagesStatus: string;
}

const ImageList: FunctionComponent<ImageListProps> = ({ images, category, categoryStatus, imagesStatus, onImageClick }) => {
    const isLoading = categoryStatus === 'loading' && imagesStatus === 'loading';
    const hasFailed = categoryStatus === 'failed' || imagesStatus === 'failed';

    return (
        <Fragment>
            {isLoading ? (
                <Spinner centerVertical centerHorizontal fullScreen />
            ) : (
                hasFailed ? (
                    <InformationMessage messageType="error" centerVertical centerHorizontal fullScreen message="Couldn't load images" />
                ) : (
                    <>
                        <GalleryTitle title={category ? category.displayName : 'Gallery'} />
                        <div className={styles.listContainer}>
                            {images.map(image => {
                                return (
                                    <SingleImage 
                                        key={image.id} 
                                        src={ImageService.getUrl(image, 'thumbnail_medium')} 
                                        imageId={image.id.toString()}
                                        categoryId={image.category.id}
                                        onClick={onImageClick}
                                    />
                                )
                            })}
                        </div>
                    </> 
                ) 
            )}
        </Fragment>
    )
}

export default ImageList;