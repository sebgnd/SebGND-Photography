import React, { useEffect, Fragment, FunctionComponent } from 'react';
import Parallax from '../../UI/Parallax/Parallax';
import { useSelector, useDispatch } from 'react-redux';

import Landing from './Landing/Landing';
import GalleriesPreview from './GalleryPreview/GalleryPreview';
import About from './About/About';

import { fetchCategoryThumbnails } from '../../../redux/slices/category';
import { imagesEmptied } from '../../../redux/slices/image';
import { selectCategoryStatus, selectAllCategoryThumbnails } from '../../../redux/selectors/categorySelector';


interface AppInfo {
    error: boolean;
    loading: boolean;
    errorMessage: string;
}

const Home: FunctionComponent = () => {
    const dispatch = useDispatch();
    const thumbnails = useSelector(selectAllCategoryThumbnails);
    const status = useSelector(selectCategoryStatus);

    useEffect(() => {
        dispatch(fetchCategoryThumbnails(3));
        dispatch(imagesEmptied())
    }, [])

    return (
        <Fragment>
            <Parallax img="images/parallax-1.jpg" speed={0.5}>
                <Landing />
            </Parallax>
            <GalleriesPreview 
                status={status} 
                thumbnails={thumbnails} 
            />
            <Parallax img="images/parallax-2.jpg" speed={0.5} >
                <About />
            </Parallax>
        </Fragment>
    )
}

export default Home;