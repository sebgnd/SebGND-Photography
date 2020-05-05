import React, { Component } from 'react';
import Image from '../../../../helper/Image';
import Paths from '../../../../helper/Paths';

import { ViewerImageWrapper, ViewerImageContainer, Img, ImageInfo } from './viewer-style';
import { Text } from '../../regular/text';
import { Margin, MarginRight, MarginBottom, Relative, Absolute } from '../../regular/positionning';
import { InlineBlock } from '../../regular/container';

interface IViewerImageProp {
    image: Image;
}

class ViewerImage extends Component<IViewerImageProp, {}> {
    fetchExif(id: number) {
        
    }

    render() {
        //const imageInfo = this.props.image.toExifString();
        const imageInfo = this.props.image.toExifString();
        const imageSource = Paths.mediumImage();

        return (
            <InlineBlock>
                <Margin amount={10}>
                    <MarginRight amount={25}>
                        <MarginBottom amount={25}>
                            <Relative>
                                <Img src={imageSource} alt={this.props.image.getId().toString()} />
                                
                                <Absolute bottom={-25} right={-25}>
                                    <ImageInfo>
                                        <Text size="medium" color="black" weight="normal">{imageInfo}</Text>
                                    </ImageInfo>
                                </Absolute>
                                
                            </Relative>
                        </MarginBottom>
                    </MarginRight>
                </Margin>
            </InlineBlock>
        )
    }
}

export default ViewerImage;