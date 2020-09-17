import React, { MouseEvent, FunctionComponent, Fragment, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from '../../../helper/image/Image';
import ImageService from '../../../helper/image/ImageService';
import { selectAllImages, selectImagesStatus } from '../../../redux/selectors/imageSelector';
import { fetchImagesFromCategory } from '../../../redux/slices/imageSlice';

import DataTable from '../../UI/DataTable/DataTable';
import ImageRow from '../../UI/DataTable/ImageRow/ImageRow';

const Playground: FunctionComponent = () => {
    const images = useSelector(selectAllImages);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchImagesFromCategory('landscape'));
    }, [])

    return (
        <Fragment>
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
        </Fragment>
    )
}

export default Playground;