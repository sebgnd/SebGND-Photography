import React, { FunctionComponent } from 'react';
import Image from '../../../helper/Image';
import Paths from '../../../helper/Paths';

import { ViewerImageWrapper, ViewerImageContainer, Img, ImageInfo } from './viewer-style';
import { Text } from '../../regular/text';

interface ViewerImageProp {
    image: Image;
}

const ViewerImage: FunctionComponent<ViewerImageProp> = (props) => {
    const imageInfo = props.image.toExifString();
    const imageSource = Paths.mediumImage();

    return (
        <ViewerImageContainer>
            <ViewerImageWrapper>
                <Img src={imageSource} alt={props.image.getId().toString()} />
                <ImageInfo>
                    <Text size="medium" color="black" weight="normal">{imageInfo}</Text>
                </ImageInfo>
            </ViewerImageWrapper>
        </ViewerImageContainer>
    )
}

export default ViewerImage;