import React, { Component } from 'react';
import Image from '../../../../data/Image';
import Paths from '../../../../data/Paths';
import { ViewerImageWrapper, ViewerImageContainer, Img, ImageInfo } from './viewer-style';
import { Text } from '../../regular/style';

type ViewerImageProp = {
    image: Image;

}

class ViewerImage extends Component<ViewerImageProp, {}> {
    fetchExif(id: number) {

    }

    render() {
        //const imageInfo = this.props.image.toExifString();
        const imageInfo = this.props.image.toExifString();
        const imageSource = Paths.mediumImage();

        return (
            <ViewerImageWrapper>
                <ViewerImageContainer>
                    <Img src={imageSource} alt={this.props.image.getId().toString()} />
                    <ImageInfo>
                        <Text size="medium" color="black" weight="normal">{imageInfo}</Text>
                    </ImageInfo>
                </ViewerImageContainer>
            </ViewerImageWrapper>
        )
    }
}

export default ViewerImage;