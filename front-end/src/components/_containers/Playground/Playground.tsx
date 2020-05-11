import React, { FunctionComponent, Fragment } from 'react';

import { Button, RoundButton, GalleryButton } from '../../UI/Button';
import { RecentImage, SingleImage, ViewerImage } from '../../UI/Image';

import Image from '../../../helper/Image';
import Gallery from '../../../helper/Gallery';

const Playground: FunctionComponent = () => {
    const placeholderGallery = new Gallery('test', 'Test');
    const placeHolderImage = new Image(1, 1920 , 1080, new Date(), placeholderGallery);
    placeholderGallery.setThumbnail(placeHolderImage);

    return (
        <Fragment>
            <ViewerImage image={placeHolderImage}/>
            <RecentImage image={placeHolderImage} gallery={placeholderGallery} />
            <SingleImage image={placeHolderImage} />
            <GalleryButton gallery={placeholderGallery} />
        </Fragment>
    )
}

export default Playground;