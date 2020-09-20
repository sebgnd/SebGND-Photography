import React, { FunctionComponent, useEffect, MouseEvent, ChangeEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllImages, selectImagesStatus } from '../../../../redux/selectors/imageSelector';
import { fetchAllImage } from '../../../../redux/slices/imageSlice';

import { FlexContainer } from '../../../Styled/container';
import ActionMenu from './ActionMenu/ActionMenu';
import DataTable from '../../../UI/DataTable/DataTable';
import ImageRow from '../../../UI/DataTable/ImageRow/ImageRow';

import Image from '../../../../helper/image/Image';
import ImageService from '../../../../helper/image/ImageService';

const Home: FunctionComponent = () => {
    const dispatch = useDispatch();
    const images = useSelector(selectAllImages);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchAllImage());
    }, [])

    return (
        <FlexContainer alignItems="flex-start" justifyContent="flex-start" >
            <ActionMenu />
            <DataTable 
                withSeparator
                datas={[]}
                style={{ width: '50%' }}
                itemsPerPage={3}
                totalItems={25}
                currentPage={page}
                onPageClick={(page: number) => setPage(page)}
                onRowDelete={(event: MouseEvent, image: Image) => console.log(`Deleting image ${image.id}`)}
                onRowClick={(event: MouseEvent, image: Image) => console.log(`Clicking image ${image.id}`)}
                onRowSelect={(event: ChangeEvent<HTMLInputElement>, image: Image) => console.log(`Image ${image.id} ${event.currentTarget.checked ? 'selected' : 'not selected'}`)}
                renderRow={(image: Image) => (
                    <ImageRow 
                        imgId={image.id}
                        imgUploadDate={new Date(image.uploadDate).toLocaleDateString()}
                        imgUrl={ImageService.getUrl(image, 'thumbnail_small')}
                        categoryName={image.category.displayName}
                    />
                )}
            />
        </FlexContainer>
    )
}

export default Home;