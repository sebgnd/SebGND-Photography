import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Button } from '../UI/Button';
import GalleryPreviewList from './GalleryPreviewList/GalleryPreviewList';
import { Title } from '../Styled/text';

import styles from './GalleryPreview.module.css';

import Category from '../../helper/category/Category';
import Paths from '../../helper/Paths';
import CategoryThumbnail from '../../helper/category/CategoryThumbnail';

interface GalleriesPreviewProps extends RouteComponentProps {
    thumbnails: CategoryThumbnail[];
}

const GalleriesPreview: FunctionComponent<GalleriesPreviewProps> = (props) => {
    const goToGalleries = () => {
        props.history.push(Paths.gallery());
    }

    return (
        <div className={styles.galleriesPreviewContainer}>
            <div className={styles.row}>
                <div className={styles.titleContainer}>
                    <Title color="black">Galleries</Title>
                </div>
            </div>
            <div className={styles.row}>
                <GalleryPreviewList thumbnails={props.thumbnails} />
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