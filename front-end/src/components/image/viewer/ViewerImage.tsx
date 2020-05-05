import React, { Component } from 'react';
import Image from '../../../helper/Image';
import Paths from '../../../helper/Paths';

import { ViewerImageWrapper, ViewerImageContainer, Img, ImageInfo } from './viewer-style';
import { Text } from '../../regular/text';

interface IViewerImageProp {
    image: Image;
}

class ViewerImage extends Component<IViewerImageProp, {}> {
    render() {
        //const imageInfo = this.props.image.toExifString();
        const imageInfo = this.props.image.toExifString();
        const imageSource = Paths.mediumImage();

        return (
            <ViewerImageContainer>
                <ViewerImageWrapper>
                    <Img src={imageSource} alt={this.props.image.getId().toString()} />
                    <ImageInfo>
                        <Text size="medium" color="black" weight="normal">{imageInfo}</Text>
                    </ImageInfo>
                </ViewerImageWrapper>
            </ViewerImageContainer>
        )
    }
}

export default ViewerImage;