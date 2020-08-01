import React, { useEffect, Fragment, FunctionComponent, useState } from 'react';
import Parallax from '../../UI/Parallax/Parallax';

import Landing from './Landing/Landing';
import GalleriesPreview from './GalleryPreview/GalleryPreview';
import About from './About/About';

import CategoryThumbnail from '../../../helper/category/CategoryThumbnail';
import CategoryApi from '../../../helper/category/CategoryApi';

interface AppInfo {
    error: boolean;
    loading: boolean;
    errorMessage: string;
}

const Home: FunctionComponent = () => {
    const [thumbnails, setThumbnails] = useState<CategoryThumbnail[]>([]);
    const [appInfo, setAppInfo] = useState<AppInfo>({
        error: false,
        errorMessage: '',
        loading: true,
    });



    const fetchGalleries = async () => {
        try {
            const newThumbnails: CategoryThumbnail[] = await CategoryApi.getKThumbnail(3);
            
            setAppInfo({
                ...appInfo,
                loading: false,
            });
            setThumbnails(newThumbnails);

        } catch (e) {
            setAppInfo({
                error: true,
                loading: false,
                errorMessage: e.message
            })
        }
    }

    useEffect(() => {
        fetchGalleries();
    }, [])

    return (
        <Fragment>
            <Parallax img="images/parallax-1.jpg" speed={0.5}>
                <Landing />
            </Parallax>
            <GalleriesPreview thumbnails={thumbnails} />
            <Parallax img="images/parallax-2.jpg" speed={0.5} >
                <About />
            </Parallax>
        </Fragment>
    )
}

export default Home;