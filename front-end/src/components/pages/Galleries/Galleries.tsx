import React, { Component, FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllCategoryThumbnails, selectCategoryStatus } from '../../../redux/selectors/category-selector';
import { fetchCategoryThumbnails } from '../../../redux/slices/category';
import { imagesEmptied } from '../../../redux/slices/image';

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