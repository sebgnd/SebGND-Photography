import React, { FunctionComponent, useEffect, ChangeEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux

import { selectSelectedImage, selectFilteredImage, selectImagesStatus } from '../../../../redux/selectors/imageSelector';
import { fetchAllImage, fetchImage, imagesFiltered } from '../../../../redux/slices/image';

import { selectAllCategories } from '../../../../redux/selectors/categorySelector';
import { fetchCategoryThumbnails } from '../../../../redux/slices/category';

import { RootState } from '../../../../redux/types';

// Components

import { FlexContainer } from '../../../Styled/container';
import ActionMenu from './ActionMenu/ActionMenu';
import ImageInformation from './ImageInformation/ImageInformation';
import ImageList from './ImageList/ImageList';

import Image from '../../../../helper/image/Image';

const Home: FunctionComponent = () => {
    const dispatch = useDispatch();
    
    const images = useSelector(selectFilteredImage);
    const imagesStatus = useSelector(selectImagesStatus);
    const selectedImage = useSelector(selectSelectedImage);
    const categories = useSelector(selectAllCategories);

    const handleFilter = (categoryId: string) => {
        dispatch(
            imagesFiltered({
                property: 'categoryId',
                value: categoryId
            })
        )
    }

    const selectImage = (imageId: number) => {
        dispatch(
            fetchImage(imageId)
        )
    }

    useEffect(() => {
        console.log(images)
    }, [images])

    useEffect(() => {
        dispatch(fetchAllImage());
        dispatch(fetchCategoryThumbnails());
    }, [])

    return (
        <FlexContainer alignItems="flex-start" justifyContent="flex-start" >
            <ActionMenu 
                categories={categories} 
                onFilterCategory={(categoryId: string) => handleFilter(categoryId)}
            />
            <ImageList
                images={images}
                status={imagesStatus}
                onImageClick={(_, image: Image) => selectImage(image.id)}
                onImageDelete={(_, image: Image) => console.log(`Deleting ${image.id}`)}
                onImageSelect={(e: ChangeEvent<HTMLInputElement>, image: Image) => console.log(`${e.target.checked ? 'Selecting' : 'Unselecting'} ${image.id}`)}
            />
            <ImageInformation image={selectedImage} />
        </FlexContainer>
    )
}

export default Home;