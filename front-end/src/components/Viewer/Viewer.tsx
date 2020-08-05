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
import Image from '../../helper/image/Image';

interface ViewerProps extends RouteComponentProps {
    categoryId?: string;
    imageId: number;
    onClose: Function;
}

const Viewer: FunctionComponent<ViewerProps> = ({ imageId, categoryId, onClose, history }) => {
    const [showLoading, setShowLoading] = useState(true);

    const dispatch = useDispatch();
    const currentImage: Image | null = useSelector(selectSelectedImage);
    const nextImageId: number | null = useSelector(selectNextId);
    const previousImageId: number | null = useSelector(selectPreviousId);
    const allImagesLoaded: boolean = useSelector(selectAllImagesLoaded);
    const image: Image | undefined = useSelector((state: RootState) => selectImageById(state, imageId))

    // Update the url on direction click
    const handleClickDirection = async (newImageId: number | null) => {
        if (newImageId === null) {
            return;
        }

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

    // If info not present in state => fetch image
    // Else select the image from the state
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

    // Change loading to false when the selected image update
    // (to not see previous selected image on component mount)
    // Run only once
    useEffect(() => {
        if (showLoading && currentImage && currentImage.id === imageId) {
            setShowLoading(false);
        }
    }, [currentImage]);

    // Fetch image on load and when image update
    // Updated when imageId route param props change
    useEffect(() => {
        fetchImage(imageId);
    }, [image]);

    return (
        <div className={styles.fixedContainer}>
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
            <Backdrop show={true} onClick={() => onClose()} />
        </div>
    );
}

export default withRouter(Viewer);