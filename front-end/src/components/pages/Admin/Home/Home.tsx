import React, { FunctionComponent, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux
import { selectSelectedImage, selectFilteredImage, selectImagesStatus, selectFilters } from '../../../../redux/selectors/image-selector';
import { fetchAllImage, fetchImage, imagesFiltered } from '../../../../redux/slices/image';

import { selectAllCategories, selectCategoryById } from '../../../../redux/selectors/category-selector';
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
    const filters = useSelector(selectFilters);

    const categories = useSelector(selectAllCategories);
    const selectedCategory = useSelector((state: RootState) => selectCategoryById(state, filters.categoryId))

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
        dispatch(fetchAllImage());
        dispatch(fetchCategoryThumbnails());
    }, [])

    return (
        <FlexContainer alignItems="flex-start" justifyContent="flex-start" >
            <ActionMenu 
                categories={categories} 
                selectedCategory={selectedCategory}
                onFilterCategory={(categoryId: string) => handleFilter(categoryId)}
                onUpload={() => console.log('Uploading')}
                onDeleteSelected={() => console.log('Deleting')}
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