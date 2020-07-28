import React, { Component, FunctionComponent, useEffect, useState, useRef } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { initial } from 'lodash'
import styles from './Viewer.module.css';

import { ViewerImage } from '../UI/Image';
import Backdrop from '../UI/Backdrop/Backdrop';
import { RoundButton } from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';

import Image from '../../helper/image/Image';
import ImageService from '../../helper/image/ImageService';

interface ViewerProps extends RouteComponentProps {
    categoryId?: string;
    imageId: number;
    onClose: Function;
}

interface ViewerState {
    image: Image | null;
    nextImageId: number | null;
    previousImageId: number | null;
}

interface AppInfo {
    loading: boolean;
    error: boolean;
}

const Viewer: FunctionComponent<ViewerProps> = ({ imageId, categoryId, onClose, history }) => {
    const [viewerInfo, setViewerInfo] = useState<ViewerState>({ 
        image: null, 
        nextImageId: null, 
        previousImageId: null,
    });
    const [appInfo, setAppInfo] = useState<AppInfo>({
        loading: false,
        error: false
    });

    const handleClickDirection = async (newImageId: number | null) => {
        if (newImageId === null) {
            return;
        }

        await fetchImage(newImageId);

        // Updating the new url
        const urlParameters = history.location.pathname.split('/');
        const newUrlParamaters = initial(urlParameters).concat([newImageId.toString()]);
        const newUrl = newUrlParamaters.join('/');

        history.replace(newUrl);
    }

    const isButtonDisabled = (direction: string) => {
        if (direction === 'left') {
            return viewerInfo.previousImageId === null;
        } else if (direction === 'right') {
            return viewerInfo.nextImageId === null;
        }
        return true;
    }

    const fetchImage = async (id: number) => {
        setAppInfo({ loading: true, error: false });

        try {
            const sameCategory: boolean = categoryId ? true : false;
            const images: (Image | null)[] = await ImageService.getWithAdjacent(id, sameCategory);

            const previous: Image | null = images[0];
            const current: Image | null = images[1];
            const next: Image | null = images[2];

            setAppInfo({ loading: false, error: false });
            setViewerInfo({ 
                image: current,
                previousImageId: next ? next.id : null,
                nextImageId: previous ? previous.id : null
             });
        } catch (err) {
            setAppInfo({ loading: false, error: true });
        }
    }

    useEffect(() => {
        fetchImage(imageId);
    }, []);

    return (
        <div className={styles.fixedContainer}>
            <Backdrop show={true} onClick={() => onClose()} />
            {(viewerInfo.image) ? (
                <div className={styles.viewerContainer}>
                    <div className={styles.arrow}>
                        <RoundButton disabled={isButtonDisabled('left')} icon="arrow-left" onClick={() => handleClickDirection(viewerInfo.previousImageId)} />
                    </div>
                    <div className={styles.image}>
                        <ViewerImage 
                            imageId={viewerInfo.image.id.toString()} 
                            src={ImageService.getUrl(viewerInfo.image, 'medium_res')} 
                            imageInfo={ImageService.getExifString(viewerInfo.image)} 
                        />
                    </div>
                    <div className={styles.arrow}>
                        <RoundButton disabled={isButtonDisabled('right')} icon="arrow-right" onClick={() => handleClickDirection(viewerInfo.nextImageId)} />
                    </div>
                </div>
            ) : (
                <Spinner centerHorizontal={true} centerVertical={true} />
            )}
        </div>
    );
}

export default withRouter(Viewer);