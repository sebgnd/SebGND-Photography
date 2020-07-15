import React, { FunctionComponent, Fragment } from 'react';

import { Button, RoundButton, GalleryButton } from '../../UI/Button';
import { RecentImage, SingleImage, ViewerImage } from '../../UI/Image';

import Image from '../../../helper/image/Image';
import Category from '../../../helper/category/Category';

const Playground: FunctionComponent = () => {
    const placehodlerCategory = new Category('test', 'Test');
    const placeHolderImage = new Image(1, 1920, 1080, placehodlerCategory, new Date());

    return (
        <Fragment>
        </Fragment>
    )
}

export default Playground;