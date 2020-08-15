import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Title } from '../../../Styled/text';
import { Button } from '../../../UI/Button';
import GalleryPreviewList from './GalleryPreviewList/GalleryPreviewList';
import Spinner from '../../../UI/Spinner/Spinner';
import ErrorMessage from '../../../UI/ErrorMessage/ErrorMessage';

import styles from './GalleryPreview.module.css';

import Paths from '../../../../helper/Paths';
import CategoryThumbnail from '../../../../helper/category/CategoryThumbnail';

interface GalleriesPreviewProps extends RouteComponentProps {
    thumbnails: CategoryThumbnail[];
    status: string;
}

const GalleriesPreview: FunctionComponent<GalleriesPreviewProps> = ({ thumbnails, status, history }) => {
    const goToGalleries = () => {
        history.push(Paths.gallery());
    }

    return (
        <div className={styles.galleriesPreviewContainer}>
            <div className={styles.row}>
                <div className={styles.titleContainer}>
                    <Title color="black">Galleries</Title>
                </div>
            </div>
            <div className={styles.row}>
                {(status === 'loading') ? (
                    <Spinner centerHorizontal />
                ) : (
                    (status === 'failed') ? (
                        <ErrorMessage centerHorizontal message="Couldn't load galleries" />
                    ) : (
                        <GalleryPreviewList thumbnails={thumbnails} />
                    )
                )}
            </div>
            <div className={styles.row}>
                <div className={styles.buttonContainer}>
                    <Button size="medium" variant="classic" onClick={goToGalleries} label="See all galleries" />
                </div>
            </div>
        </div>
    )
}

export default withRouter(GalleriesPreview);