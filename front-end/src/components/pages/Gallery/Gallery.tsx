import React, { MouseEvent, FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ImageList from './ImageList/ImageList';
import Viewer from '../../Viewer/Viewer';

import Image from '../../../helper/image/Image';
import Category from '../../../helper/category/Category';
import CategoryService from '../../../helper/category/CategoryService';
import ImageService from '../../../helper/image/ImageService';

interface RouteParams {
    id: string;
    imageId?: string
}

interface GalleryInfo {
    category: Category;
    images: Image[];
}

interface AppInfo {
    error: boolean,
    loading: boolean
}

type GalleryProps = RouteComponentProps<RouteParams>;

const Gallery: FunctionComponent<GalleryProps> = ({ match, history }) => {
    
    const [galleryInfo, setGalleryInfo] = useState<GalleryInfo>({
        category: {
            id: '',
            displayName: ''
        },
        images: [],
    });
    const [appInfo, setAppInfo] = useState<AppInfo>({
        error: false, 
        loading: false, 
    })

    const fetchGallery = async (categoryId: string) => {
        setAppInfo({ error: false, loading: true });

        try {
            const category: Category = await CategoryService.get(categoryId);
            const images: Image[] = await ImageService.getFromCategory(categoryId);

            setGalleryInfo({ images, category });
            setAppInfo({ error: false, loading: false });

        } catch (e) {
            setAppInfo({ error: true, loading: false });
        }
    }

    const handleImageClick = (event: MouseEvent, imageId: string, categoryId: string) => {
        history.push(`/gallery/${match.params.id}/${imageId}`);
    }

    const handleClose = () => {
        history.replace(`/gallery/${match.params.id}`);
    }

    useEffect(() => {
        fetchGallery(match.params.id);
    }, [])

    return (
        <>
            <ImageList 
                images={galleryInfo.images} 
                category={galleryInfo.category}
                onImageClick={handleImageClick}
            />
            {(match.params.imageId && galleryInfo.images.length) && (
                <Viewer 
                    categoryId={match.params.id}
                    imageId={parseInt(match.params.imageId)} 
                    onClose={() => handleClose()} />
            )}
        </>

    )
} 

export default withRouter(Gallery);