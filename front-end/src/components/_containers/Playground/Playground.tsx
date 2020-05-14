import React, { FunctionComponent, Fragment } from 'react';

import { Button, RoundButton, GalleryButton } from '../../UI/Button';
import { RecentImage, SingleImage, ViewerImage } from '../../UI/Image';

import Image from '../../../helper/image/Image';
import ImageWithCategory from '../../../helper/image/ImageWithCategory';
import GalleryPreview from '../../../helper/gallery/GalleryPreview';
import Category from '../../../helper/Category';

const Playground: FunctionComponent = () => {
    const placeHolderImage = new Image(1, new Date());
    const placehodlerCategory = new Category('test', 'Test');

    return (
        <Fragment>
            <ViewerImage image={placeHolderImage} />
            <RecentImage image={placeHolderImage} category={placehodlerCategory} />
            <SingleImage image={placeHolderImage} category={placehodlerCategory} />
        </Fragment>
    )
}

export default Playground;