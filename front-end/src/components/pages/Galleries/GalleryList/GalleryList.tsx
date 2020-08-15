import React, { FunctionComponent } from 'react';
import Image from '../../../../helper/image/Image';
import { GalleryButton } from '../../../UI/Button';

import styles from './GalleryList.module.css';
import CategoryService from '../../../../helper/category/CategoryService';
import CategoryThumbnail from '../../../../helper/category/CategoryThumbnail';
import Spinner from '../../../UI/Spinner/Spinner';
import ErrorMessage from '../../../UI/ErrorMessage/ErrorMessage';

interface GalleriesListProps {
    thumbnails: CategoryThumbnail[];
    status: string;
}

const GalleriesList: FunctionComponent<GalleriesListProps> = ({ thumbnails, status }) => {
    return (
        <div className={styles.listContainer}>
            {(status === 'loading') ? (
                <Spinner centerHorizontal centerVertical fullScreen />
            ) : (
                (status === 'failed' ? (
                    <ErrorMessage centerHorizontal centerVertical fullScreen message="Couldn't load galleries"  />
                ) : (
                    <>
                        {thumbnails.map(thumbnail => {
                            return (
                                <div key={thumbnail.category.id} className={styles.galleryButtonContainer}>
                                    <GalleryButton
                                        src={CategoryService.getThumbnailUrl(thumbnail, 'thumbnail_medium')}
                                        imageId={thumbnail.image ? thumbnail.image.id.toString() : '-1'}
                                        categoryId={thumbnail.category.id}
                                        categoryDisplayName={thumbnail.category.displayName}   
                                    />
                                </div>
                            )
                        })}
                    </>
                ))

            )}
        </div>
    )
}

export default GalleriesList;