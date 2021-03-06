import React, { Fragment, FunctionComponent, useEffect, MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Spinner from '../../UI/Spinner/Spinner';
import RecentList from './RecentList/RecentList';
import Viewer from '../../Viewer/Viewer';
import withEndScroll, { EndScrollProps } from '../../HOC/withEndScroll';
import InformationMessage from '../../UI/InformationMessage/InformationMessage';

import { fetchImagesFromPage, imagesEmptied } from '../../../redux/slices/image';
import { selectAllImages, selectImagesStatus, selectAllImagesLoaded, selectCurrentPage } from '../../../redux/selectors/image-selector';
import { useDispatch, useSelector } from 'react-redux';

interface RouteParams {
    imageId?: string;
}

type RecentProps = RouteComponentProps<RouteParams> & EndScrollProps;

const Recent: FunctionComponent<RecentProps> = ({ endWindowReached, match, history }) => {
    const dispatch = useDispatch();
    const images = useSelector(selectAllImages);
    const status = useSelector(selectImagesStatus);
    const finishedLoading = useSelector(selectAllImagesLoaded);
    const currentPage = useSelector(selectCurrentPage);

    const minTimeBetweenFetch: number = 250;
    const nbImagePerFetch: number = 5;

    const handleClose = () => history.replace('/recent');
    const handleGalleryClick = (event: MouseEvent, categoryId: string) =>  history.push(`/gallery/${categoryId}`);
    const handleImageClick = (event: MouseEvent, imageId: string) => history.push(`/recent/${imageId}`);

    const fetchImages = async () => {
        if (status === 'loading' || finishedLoading) {
            return;
        }

        dispatch(
            fetchImagesFromPage({ 
                page: currentPage + 1, 
                itemsPerPage: nbImagePerFetch
            })
        );
    }

    useEffect(() => {
        dispatch(
            imagesEmptied()
        );
    }, []);

    useEffect(() => {
        if (images.length === 0) {
            fetchImages();
        }
    }, [images]);

    useEffect(() => {
        if (endWindowReached && !finishedLoading) {
            fetchImages();
        }
    }, [endWindowReached])

    return (
        <Fragment>
            <RecentList images={images} onGalleryClick={handleGalleryClick} onImageClick={handleImageClick} />
            { status === 'loading' && (
                <Spinner centerHorizontal centerVertical fullScreen={images.length === 0} />
            )}
            { status === 'failed' && (
                <InformationMessage messageType="error" centerHorizontal centerVertical fullScreen={images.length === 0} message="Couln't load images" />
            )}
            {(match.params.imageId) && (
                <Viewer 
                    imageId={parseInt(match.params.imageId)}
                    onClose={() => handleClose()}
                />
            )}
        </Fragment>
    )
}

export default withEndScroll(Recent);