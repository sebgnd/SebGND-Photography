import React, { FunctionComponent } from 'react';
import Gallery from '../../../helper/Gallery';
import { GalleryButton } from '../../Button';

interface GalleryPreviewListProps {
    galleries: Gallery[]
}

const GalleryPreviewList: FunctionComponent<GalleryPreviewListProps> = ({ galleries }) => {

    return (
        <React.Fragment>
            {galleries.map((gallery) => {
                return <GalleryButton gallery={gallery} />
            })}
        </React.Fragment>
    );
}

export default GalleryPreviewList;