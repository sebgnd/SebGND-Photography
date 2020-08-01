import React, { Fragment, FunctionComponent, useState, useEffect, MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Spinner from '../../UI/Spinner/Spinner';
import Image from '../../../helper/image/Image';
import RecentList from './RecentList/RecentList';
import ImageApi from '../../../helper/image/ImageApi';
import withEndScroll, { EndScrollProps } from '../../HOC/withEndScroll';
import Viewer from '../../Viewer/Viewer';

interface RecentInfo {
    images: Image[]
}

interface RouteParams {
    imageId?: string;
}

interface AppInfo {
    error: boolean;
    loading: boolean;
    finishedLoading: boolean;
    errorMessage: string;
}

const NB_IMAGE_PER_FETCH: number = 5;
const MIN_TIME_BETWEEN_FETCH: number = 250;

type RecentProps = RouteComponentProps<RouteParams> & EndScrollProps;

const Recent: FunctionComponent<RecentProps> = ({ endWindowReached, match, history }) => {
    const [recentInfo, setRecentInfo] = useState<RecentInfo>({
        images: []
    });
    const [appInfo, setAppInfo] = useState<AppInfo>({
        error: false,
        errorMessage: '',
        finishedLoading: false,
        loading: false
    });

    const fetchImages = async () => {
        if (appInfo.loading || appInfo.finishedLoading) {
            return;
        }

        try {
            setAppInfo({ ...appInfo, loading: true, error: false });
            const newImages: Image[] = await ImageApi.getKFromOffset(NB_IMAGE_PER_FETCH, recentInfo.images.length);

            setTimeout(() => {
                if(newImages.length !== 0) {
                    setAppInfo({ ...appInfo, loading: false });
                    setRecentInfo(prevRecentInfo => {
                        return { 
                            images: [...prevRecentInfo.images, ...newImages] 
                        }
                    });
                } else {
                    setAppInfo({ ...appInfo, loading: false, finishedLoading: true });
                }
            }, MIN_TIME_BETWEEN_FETCH)

        } catch (e) {
            setAppInfo({ ...appInfo, loading: false, error: true, errorMessage: e.message});
        }
    }

    const handleClose = () => {
        history.replace('/recent');
    }

    const handleGalleryClick = (event: MouseEvent, categoryId: string) => {
        history.push(`/gallery/${categoryId}`);
    }

    const handleImageClick = (event: MouseEvent, imageId: string) => {
        history.push(`/recent/${imageId}`);
    }

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        if (endWindowReached && !appInfo.finishedLoading) {
            fetchImages();
        }
    }, [endWindowReached])

    return (
        <Fragment>
            <RecentList images={recentInfo.images} onGalleryClick={handleGalleryClick} onImageClick={handleImageClick} />
            { appInfo.loading && (
                <Spinner centerHorizontal={true} />
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