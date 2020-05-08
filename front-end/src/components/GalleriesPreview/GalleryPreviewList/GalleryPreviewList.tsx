import React, { FunctionComponent } from 'react';

import Gallery from '../../../helper/Gallery';

import { GalleryButton } from '../../Button';
import { ButtonContainer, ListContainer } from './gallery-preview-list.style';

interface GalleryPreviewListProps {
    galleries: Gallery[]
}

const GalleryPreviewList: FunctionComponent<GalleryPreviewListProps> = ({ galleries }) => {

    return (
        <ListContainer>
            {galleries.map((gallery) => {
                return (
                    <GalleryButton gallery={gallery} />
                )
            })}
        </ListContainer>
    );
}

export default GalleryPreviewList;