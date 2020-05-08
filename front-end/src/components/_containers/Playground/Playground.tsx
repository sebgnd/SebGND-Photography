import React, { FunctionComponent } from 'react';

import { Button, RoundButton, GalleryButton } from '../../Button';
import { RecentImage, SingleImage, ViewerImage } from '../../Image';

import Image from '../../../helper/Image';
import Gallery from '../../../helper/Gallery';

const Playground: FunctionComponent = () => {
    const placeholderImage = new Image(1, 1080, 1920, new Date());
    const placeholderGallery = new Gallery('test', 'Test', placeholderImage);

    return (
        <ViewerImage image={placeholderImage}/>
    )
}

export default Playground;