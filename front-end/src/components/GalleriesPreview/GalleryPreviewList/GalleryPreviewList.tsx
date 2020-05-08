import React, { FunctionComponent } from 'react';

import Gallery from '../../../helper/Gallery';

import { GalleryButton } from '../../Button';
import { ListContainer, ButtonContainer } from './gallery-preview-list.style';

interface GalleryPreviewListProps {
    galleries: Gallery[]
}

const GalleryPreviewList: FunctionComponent<GalleryPreviewListProps> = ({ galleries }) => {

    return (
        <ListContainer>
            {galleries.map((gallery) => {
                return (
                    <ButtonContainer>
                        <GalleryButton gallery={gallery} />
                    </ButtonContainer>
                )
            })}
        </ListContainer>
    );
}

export default GalleryPreviewList;