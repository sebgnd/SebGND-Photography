import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Title } from '../../../Styled/text';
import { Button } from '../../../UI/Button';
import GalleryPreviewList from './GalleryPreviewList/GalleryPreviewList';
import Spinner from '../../../UI/Spinner/Spinner';
import InformationMessage from '../../../UI/InformationMessage/InformationMessage';

import styles from './GalleryPreview.module.css';

import { CategoryWithThumbnail } from '../../../../helper/category/Category';

interface GalleriesPreviewProps extends RouteComponentProps {
    thumbnails: CategoryWithThumbnail[];
    status: string;
}

const GalleriesPreview: FunctionComponent<GalleriesPreviewProps> = ({ thumbnails, status, history }) => {
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
                        <InformationMessage centerHorizontal messageType="error" message="Couldn't load galleries" />
                    ) : (
                        <GalleryPreviewList thumbnails={thumbnails} />
                    )
                )}
            </div>
            <div className={styles.row}>
                <div className={styles.buttonContainer}>
                    <Button size="medium" variant="classic" to="/gallery" label="See all galleries" />
                </div>
            </div>
        </div>
    )
}

export default withRouter(GalleriesPreview);