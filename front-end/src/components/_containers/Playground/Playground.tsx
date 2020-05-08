import React, { FunctionComponent, Fragment } from 'react';

import { Button, RoundButton, GalleryButton } from '../../UI/Button';
import { RecentImage, SingleImage, ViewerImage } from '../../UI/Image';

import Image from '../../../helper/Image';
import Gallery from '../../../helper/Gallery';

const Playground: FunctionComponent = () => {
    const placeholderImage = new Image(1, 1080, 1920, new Date());
    const placeholderGallery = new Gallery('test', 'Test', placeholderImage);

    return (
        <Fragment>
            <ViewerImage image={placeholderImage}/>
            <RecentImage image={placeholderImage} gallery={placeholderGallery} />
            <SingleImage image={placeholderImage} gallery={placeholderGallery} />
            <GalleryButton gallery={placeholderGallery} />
        </Fragment>
    )
}

export default Playground;