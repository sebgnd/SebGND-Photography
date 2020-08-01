import React, { Component, FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllCategoryThumbnails, selectCategoryStatus } from '../../../redux/selectors/categorySelector';
import { fetchCategoryThumbnails } from '../../../redux/slices/categorySlice';

import GalleryList from './GalleryList/GalleryList';

interface AppInfo {
    error: boolean;
    loading: boolean;
    errorMessage: string;
}

const Galleries: FunctionComponent = () => {
    const dispatch = useDispatch();
    const thumbnails = useSelector(selectAllCategoryThumbnails);
    const status = useSelector(selectCategoryStatus);

    useEffect(() => {
        dispatch(fetchCategoryThumbnails())
    }, []);

    return (
        <GalleryList status={status} thumbnails={thumbnails} />
    )
}

export default Galleries;