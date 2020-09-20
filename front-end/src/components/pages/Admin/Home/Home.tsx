import React, { FunctionComponent, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllImages, selectSelectedImage } from '../../../../redux/selectors/imageSelector';
import { fetchAllImage, fetchImage } from '../../../../redux/slices/imageSlice';

import { FlexContainer } from '../../../Styled/container';
import ActionMenu from './ActionMenu/ActionMenu';
import ImageInformation from './ImageInformation/ImageInformation';
import ImageList from './ImageList/ImageList';

import Image from '../../../../helper/image/Image';

const Home: FunctionComponent = () => {
    const dispatch = useDispatch();
    const images = useSelector(selectAllImages);
    const selectedImage = useSelector(selectSelectedImage);

    const selectImage = (imageId: number) => {
        dispatch(
            fetchImage(imageId)
        )
    }

    useEffect(() => {
        dispatch(fetchAllImage());
    }, [])

    return (
        <FlexContainer alignItems="flex-start" justifyContent="flex-start" >
            <ActionMenu />
            <ImageList
                images={images}
                onImageClick={(_, image: Image) => selectImage(image.id)}
                onImageDelete={(_, image: Image) => console.log(`Deleting ${image.id}`)}
                onImageSelect={(e: ChangeEvent<HTMLInputElement>, image: Image) => console.log(`${e.target.checked ? 'Selecting' : 'Unselecting'} ${image.id}`)}
            />
            <ImageInformation image={selectedImage} />
        </FlexContainer>
    )
}

export default Home;