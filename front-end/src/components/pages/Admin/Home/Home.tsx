import React, { FunctionComponent, useEffect, ChangeEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToggle } from '../../../../hooks';

// Redux
import { selectSelectedImage, selectFilteredImage, selectImagesStatus, selectFilters } from '../../../../redux/selectors/image-selector';
import { fetchAllImage, fetchImage, imagesFiltered } from '../../../../redux/slices/image';

import { selectAllCategories, selectCategoryById } from '../../../../redux/selectors/category-selector';
import { fetchCategories } from '../../../../redux/slices/category';

import { RootState } from '../../../../redux/types';

// Components
import { FlexContainer } from '../../../Styled/container';
import ActionMenu from './ActionMenu/ActionMenu';
import ImageInformation from './ImageInformation/ImageInformation';
import ImageList from './ImageList/ImageList';
import UploadModal from './UploadModal/UploadModal';
import { FileStateMap } from '../../../UI/DropArea/DropArea';

import Image from '../../../../helper/image/Image';

const Home: FunctionComponent = () => {
    // TEMPORARY
    // TODO: Move file management into redux
    const [files, setFiles] = useState<File[]>([]);

    const dispatch = useDispatch();
    
    const images = useSelector(selectFilteredImage);
    const imagesStatus = useSelector(selectImagesStatus);
    const selectedImage = useSelector(selectSelectedImage);
    const filters = useSelector(selectFilters);

    const categories = useSelector(selectAllCategories);
    const selectedCategory = useSelector((state: RootState) => selectCategoryById(state, filters.categoryId))

    const [showUploadModal, toggleUploadModal] = useToggle(false);

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

    const handleFileDrop = (droppedFiles: File[]) => {
        setFiles(droppedFiles);
    }

    const getFileState = () => {
        return files.reduce((acc: FileStateMap, file) => {
            acc[file.name] = 'loading';

            return acc;
        }, {})
    }

    useEffect(() => {
        dispatch(fetchAllImage());
        dispatch(fetchCategories());
    }, [])

    return (
        <FlexContainer alignItems="flex-start" justifyContent="flex-start" >
            <ActionMenu 
                categories={categories} 
                selectedCategory={selectedCategory}
                onFilterCategory={(categoryId: string) => handleFilter(categoryId)}
                onUploadClick={() => toggleUploadModal()}
                onDeleteSelectedClick={() => console.log('Deleting')}
            />
            <ImageList
                images={images}
                status={imagesStatus}
                onImageClick={(_, image: Image) => selectImage(image.id)}
                onImageDelete={(_, image: Image) => console.log(`Deleting ${image.id}`)}
                onImageSelect={(e: ChangeEvent<HTMLInputElement>, image: Image) => console.log(`${e.target.checked ? 'Selecting' : 'Unselecting'} ${image.id}`)}
            />
            <ImageInformation image={selectedImage} />
            <UploadModal
                loading={false}
                isOpen={showUploadModal}
                fileStatesMap={getFileState()}
                onFilesChange={(files: File[]) => handleFileDrop(files)}
                onUpload={() => console.log('Uploading')}
                onClose={() => toggleUploadModal()}
            />
        </FlexContainer>
    )
}

export default Home;