import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GalleryButtonContainer, GalleryImage, Img, GalleryNameContainer } from './gallery-button-style';
import { Text } from '../../regular/text';
import { Margin, MarginBottom, MarginRight, Relative, AbsoluteWithWidth } from '../../regular/positionning';
import { InlineBlock, SizedContainer, ButtonContainer } from '../../regular/container';

import Image from '../../../../helper/Image';
import Paths from '../../../../helper/Paths';

interface IGalleryButtonProp extends RouteComponentProps {
    galleryDisplayName: string;
    galleryName: string;
    image: Image;
}

class GalleryButton extends Component<IGalleryButtonProp, {}> {
    goToGallery(gallery: string) {
        const url = Paths.galleryWithName(this.props.galleryName);
        this.props.history.push(url);
    }

    render() {
        const imageSource = Paths.mediumThumbnailImage(); 

        return (
            <InlineBlock>
                <Margin amount={10}>
                    <MarginBottom amount={25}>
                        <MarginRight amount={25}>
                            <GalleryButtonContainer>
                                <ButtonContainer onClick={() => this.goToGallery(this.props.galleryName)}>
                                    <SizedContainer height={[100, 400]} width={[100, 400]}>
                                        <Relative>

                                            <GalleryImage>
                                                <Img src={imageSource} alt={this.props.image.getId().toString()} />
                                            </GalleryImage>

                                            <AbsoluteWithWidth id="gallery-name" right={-25} bottom={-25} min={75} max={95}>
                                                <GalleryNameContainer>
                                                    <Text size="medium" color="black" weight="normal">{this.props.galleryDisplayName}</Text>
                                                </GalleryNameContainer>
                                            </AbsoluteWithWidth>

                                        </Relative>
                                    </SizedContainer>
                                </ButtonContainer>
                            </GalleryButtonContainer>
                        </MarginRight>
                    </MarginBottom>
                </Margin>
            </InlineBlock>
        )
    }
}

export default withRouter(GalleryButton);