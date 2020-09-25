import React, { FunctionComponent, MouseEvent, ChangeEvent } from 'react';
import styles from './ImageList.module.css';

import DataTable from '../../../../UI/DataTable/DataTable';
import ImageRow from '../../../../UI/DataTable/ImageRow/ImageRow';

import Image from '../../../../../helper/image/Image';
import ImageService from '../../../../../helper/image/ImageService';

interface ImageListProps {
    images: Image[];
    onImageClick: (event: MouseEvent, image: Image) => void;
    onImageDelete: (event: MouseEvent, image: Image) => void;
    onImageSelect: (event: ChangeEvent<HTMLInputElement>, image: Image) => void;    
}

const ImageList: FunctionComponent<ImageListProps> = ({ images, onImageDelete, onImageSelect, onImageClick }) => {
    return (
        <DataTable 
            withSeparator
            withPagination
            
            datas={images}
            className={styles.imageList}
            itemsPerPage={7}

            onRowDelete={onImageDelete}
            onRowClick={onImageClick}
            onRowSelect={onImageSelect}
            
            renderRow={(image: Image) => (
                <ImageRow 
                    imgId={image.id}
                    imgUploadDate={new Date(image.uploadDate).toLocaleDateString()}
                    imgUrl={ImageService.getUrl(image, 'thumbnail_small')}
                    categoryName={image.category.displayName}
                />
            )}
        />
    )
}

export default ImageList;