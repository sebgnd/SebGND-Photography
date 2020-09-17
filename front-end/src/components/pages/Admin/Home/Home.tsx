import React, { FunctionComponent, useEffect, MouseEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllImages, selectImagesStatus } from '../../../../redux/selectors/imageSelector';
import { fetchAllImage } from '../../../../redux/slices/imageSlice';

import { FlexContainer } from '../../../Styled/container';
import ActionMenu from './ActionMenu/ActionMenu';
import DataTable from '../../../UI/DataTable/DataTable';
import ImageRow from '../../../UI/DataTable/ImageRow/ImageRow';

import Image from '../../../../helper/image/Image';

const Home: FunctionComponent = () => {
    const dispatch = useDispatch();
    const images = useSelector(selectAllImages);

    useEffect(() => {
        dispatch(fetchAllImage());
    }, [])

    return (
        <FlexContainer alignItems="flex-start" justifyContent="flex-start" >
            <ActionMenu />
            <DataTable 
                withSeparator
                datas={images}
                style={{ width: '50%' }}
                onRowDelete={(event: MouseEvent, image: Image) => console.log(`Deleting image ${image.id}`)}
                onRowClick={(event: MouseEvent, image: Image) => console.log(`Clicking image ${image.id}`)}
                onRowSelect={(event: ChangeEvent<HTMLInputElement>, image: Image) => console.log(`Image ${image.id} ${event.currentTarget.checked ? 'selected' : 'not selected'}`)}
                renderRow={(image: Image) => (
                    <ImageRow 
                        image={image}
                        properties={['uploadDate']}
                    />
                )}
            />
        </FlexContainer>
    )
}

export default Home;