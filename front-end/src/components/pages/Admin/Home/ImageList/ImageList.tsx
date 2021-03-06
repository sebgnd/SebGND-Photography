import React, { FunctionComponent, MouseEvent, ChangeEvent } from 'react';
import styles from './ImageList.module.css';

import DataTable from '../../../../UI/DataTable/DataTable';
import ImageRow from '../../../../UI/DataTable/ImageRow/ImageRow';

import Image from '../../../../../helper/image/Image';
import ImageService from '../../../../../helper/image/ImageService';

interface ImageListProps {
    images: Image[];
    status: string;
    onImageClick: (event: MouseEvent, image: Image) => void;
    onImageDelete: (event: MouseEvent, image: Image) => void;
    onImageSelect: (event: ChangeEvent<HTMLInputElement>, image: Image) => void;    
}

const ImageList: FunctionComponent<ImageListProps> = ({ images, status, onImageDelete, onImageSelect, onImageClick }) => {
    return (
        <DataTable 
            withSeparator
            withPagination
            
            loading={(status === 'loading' && images.length === 0)}
            error={(status === 'failed' && images.length === 0)}
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