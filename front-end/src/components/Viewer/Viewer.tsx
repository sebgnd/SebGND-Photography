import React, { FunctionComponent, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initial } from 'lodash'

import { ViewerImage } from '../UI/Image';
import Backdrop from '../UI/Backdrop/Backdrop';
import { RoundButton } from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';
import styles from './Viewer.module.css';

import ImageService from '../../helper/image/ImageService';

import { selectSelectedImage, selectNextId, selectPreviousId, selectAllImagesLoaded, selectImageById, selectImagesStatus } from '../../redux/selectors/imageSelector';
import { fetchImageWithAdjacent, imageSelected } from '../../redux/slices/imageSlice';
import { RootState } from '../../redux/types';

interface ViewerProps extends RouteComponentProps {
    categoryId?: string;
    imageId: number;
    onClose: Function;
}

const Viewer: FunctionComponent<ViewerProps> = ({ imageId, categoryId, onClose, history }) => {
    const dispatch = useDispatch();
    const [showLoading, setShowLoading] = useState(true);
    const currentImage = useSelector(selectSelectedImage);
    const nextImageId = useSelector(selectNextId);
    const previousImageId = useSelector(selectPreviousId);
    const allImagesLoaded = useSelector(selectAllImagesLoaded);
    const image = useSelector((state: RootState) => selectImageById(state, imageId))

    const handleClickDirection = async (newImageId: number | null) => {
        if (newImageId === null) {
            return;
        }

        // Fetch the new image
        fetchImage(newImageId);

        // Updating the new url
        const urlParameters = history.location.pathname.split('/');
        const newUrlParamaters = initial(urlParameters).concat([newImageId.toString()]);
        const newUrl = newUrlParamaters.join('/');

        history.replace(newUrl);
    }

    const isButtonDisabled = (direction: string) => {
        if (direction === 'left') {
            return nextImageId === null;
        } else if (direction === 'right') {
            return previousImageId === null;
        }
        return true;
    }

    const fetchImage = (id: number) => {
        const sameCategory: boolean = categoryId ? true : false;

        if (image && allImagesLoaded && ImageService.hasAllInfo(image)) {
            dispatch(imageSelected(id));
        } else {
            dispatch(
                fetchImageWithAdjacent({ 
                    id, 
                    sameCategory 
                })
            );
        }
    }

    useEffect(() => {
        if (showLoading && currentImage && currentImage.id === imageId) {
            setShowLoading(false);
        }
    }, [currentImage])

    useEffect(() => {
        fetchImage(imageId);
    }, []);

    return (
        <div className={styles.fixedContainer}>
            <Backdrop show={true} onClick={() => onClose()} />
            <div className={styles.viewerContainer}>
                <div className={styles.arrow}>
                    <RoundButton disabled={isButtonDisabled('left')} icon="arrow-left" onClick={() => handleClickDirection(nextImageId)} />
                </div>
                <div className={styles.image}>
                    {(currentImage && !showLoading) ? (
                        <ViewerImage 
                            imageId={currentImage.id.toString()} 
                            src={ImageService.getUrl(currentImage, 'medium_res')} 
                            imageInfo={ImageService.getExifString(currentImage)} 
                        />
                    ) : (
                        <Spinner centerHorizontal={true} centerVertical={true} />
                    )}
                </div>
                <div className={styles.arrow}>
                    <RoundButton disabled={isButtonDisabled('right')} icon="arrow-right" onClick={() => handleClickDirection(previousImageId)} />
                </div>
            </div>
        </div>
    );
}

export default withRouter(Viewer);