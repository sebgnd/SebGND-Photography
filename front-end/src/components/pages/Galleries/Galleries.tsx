import React, { Component, FunctionComponent, useState, useEffect } from 'react';
import GalleryList from './GalleryList/GalleryList';

import CategoryApi from '../../../helper/category/CategoryApi';
import CategoryThumbnail from '../../../helper/category/CategoryThumbnail';

interface AppInfo {
    error: boolean;
    loading: boolean;
    errorMessage: string;
}

const Galleries: FunctionComponent = () => {
    const [thumbnails, setThumbnails] = useState<CategoryThumbnail[]>([]);
    const [appInfo, setAppInfo] = useState<AppInfo>({
        error: false,
        loading: true,
        errorMessage: ''
    });

    const fetchGalleries = async () => {
        try {
            const thumbnails: CategoryThumbnail[] = await CategoryApi.getAllThumbnail();

            setThumbnails(thumbnails);
            setAppInfo({
                ...appInfo,
                error: false,
                loading: false,
            })

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
        <GalleryList thumbnails={thumbnails} />
    )
}

export default Galleries;