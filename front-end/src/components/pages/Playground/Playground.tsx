import React, { MouseEvent, FunctionComponent, Fragment, useEffect, ChangeEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from '../../../helper/image/Image';
import ImageService from '../../../helper/image/ImageService';
import { selectAllImages, selectImagesStatus } from '../../../redux/selectors/image-selector';
import { fetchImagesFromCategory } from '../../../redux/slices/image';
import { Button } from '../../UI/Button';

import DataTable from '../../UI/DataTable/DataTable';
import ImageRow from '../../UI/DataTable/ImageRow/ImageRow';
import Modal from '../../UI/Modal/Modal';

const Playground: FunctionComponent = () => {
    const images = useSelector(selectAllImages);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        dispatch(fetchImagesFromCategory('landscape'));
    }, [])

    return (
        <Fragment>
            <Button label="Show modal" onClick={() => setShowModal(true)} />
            <Modal 
                title="Modal" 
                isOpen={showModal}
                onConfirm={() => console.log('onConfirm')}
                onCancel={() => setShowModal(false)}
                onClose={() => setShowModal(false)}
            >
                
            </Modal>
        </Fragment>
    )
}

export default Playground;