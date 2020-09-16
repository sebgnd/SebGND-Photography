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
                datas={images}
                style={{ width: '50%' }}
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