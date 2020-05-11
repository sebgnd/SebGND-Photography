import React, { FunctionComponent, Fragment } from 'react';

import { Button, RoundButton, GalleryButton } from '../../UI/Button';
import { RecentImage, SingleImage, ViewerImage } from '../../UI/Image';

import Image from '../../../helper/Image';
import Gallery from '../../../helper/Gallery';

const Playground: FunctionComponent = () => {
    const placeHolderImage = new Image(1, 'test', new Date());
    const placeholderGallery = new Gallery('test', 'Test', placeHolderImage);

    return (
        <Fragment>
            <ViewerImage image={placeHolderImage}/>
            <RecentImage image={placeHolderImage} gallery={placeholderGallery} />
            <SingleImage image={placeHolderImage} gallery={placeholderGallery} />
            <GalleryButton gallery={placeholderGallery} />
        </Fragment>
    )
}

export default Playground;