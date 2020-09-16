import React, { MouseEvent, FunctionComponent, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from '../../../helper/image/Image';
import { selectAllImages, selectImagesStatus } from '../../../redux/selectors/imageSelector';
import { fetchImagesFromCategory } from '../../../redux/slices/imageSlice';

import DataTable from '../../UI/DataTable/DataTable';

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
                renderRow={(image: Image) => (
                    <div style={{ display: 'flex', }}>
                        <p>{image.id}</p>
                        <p>{image.category.displayName}</p>
                    </div>
                )}
            />
        </Fragment>
    )
}

export default Playground;