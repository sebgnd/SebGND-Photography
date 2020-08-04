import React, { Component, FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllCategoryThumbnails, selectCategoryStatus } from '../../../redux/selectors/categorySelector';
import { fetchCategoryThumbnails } from '../../../redux/slices/categorySlice';
import { imagesEmptied } from '../../../redux/slices/imageSlice';

import GalleryList from './GalleryList/GalleryList';

const Galleries: FunctionComponent = () => {
    const dispatch = useDispatch();
    const thumbnails = useSelector(selectAllCategoryThumbnails);
    const status = useSelector(selectCategoryStatus);

    useEffect(() => {
        dispatch(fetchCategoryThumbnails())
        dispatch(imagesEmptied());
    }, []);

    return (
        <GalleryList status={status} thumbnails={thumbnails} />
    )
}

export default Galleries;