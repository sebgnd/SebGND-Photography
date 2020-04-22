import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Paths from '../../../../data/Paths';
import Image from './../../../../data/Image';

import { RecentImageContainer, InfoFlex, ImageContainer, FillerImage, AdaptedImage, ButtonContainerWidthWidth } from './recent-image-style';
import { InlineBlock, FloatLeft, FloatRight, Text, MarginLeft, MarginRight } from '../../regular/style';
import { Button } from '../../button';

interface IRecentImageProp extends RouteComponentProps {
    // Image information
    image: Image;

    // Gallery information
    galleryDisplayName: string;
    galleryName: string;
}

// TODO: Change imageType to a enum ImageType, overkill ?
// TODO: Figure out if image is landscape or portrait
// TODO: Get the right path for the image from files server -> imageSource

class RecentImage extends Component<IRecentImageProp, {}> {
    goToGallery(name: string) {
        const galleryLink = `gallery/${name}`;
        this.props.history.push(galleryLink);
    }

    goToImage(id: number, fromGallery: string) {
        const imageLink = `viewer/${fromGallery}/${id.toString()}`;
        this.props.history.push(imageLink);
    }

    render() {
        const { image, galleryDisplayName, galleryName } = this.props;
        // Image information
        const formatedDate = image.getFormatedDate();
        const id = image.getId().toString();
        const imageType = image.isPortrait() ? 'portrait' : 'landscape';
        
        // Links to other pages
        const galleryLink = `gallery/${galleryName}`;
        const imageLink = `viewer/${galleryName}/${id}`;
        const imageSource = Paths.smallImage();
        
        return (
            <InlineBlock>
                <RecentImageContainer>
                    <InfoFlex>
                        <InlineBlock>
                            <FloatLeft>
                                <MarginLeft amount={20}>
                                    <Button variant="light" size="small" onClick={() => this.goToGallery(galleryName)}>{galleryDisplayName}</Button>
                                </MarginLeft>
                            </FloatLeft>
                        </InlineBlock>
                        <InlineBlock>
                            <FloatRight>
                                <MarginRight amount={20}>
                                    <Text size="small" color="#7E7E7E" weight="bold">{formatedDate}</Text>
                                </MarginRight>
                            </FloatRight>
                        </InlineBlock>
                    </InfoFlex>
                    
                    <ImageContainer>
                        <ButtonContainerWidthWidth width="100%" onClick={() => this.goToImage(image.getId(), galleryName)}>
                            { image.isPortrait() && (
                                <FillerImage src={imageSource} alt={id} />
                            )}
                            <AdaptedImage type={imageType} src={imageSource} alt={id} />
                        </ButtonContainerWidthWidth>
                    </ImageContainer>
                </RecentImageContainer>
            </InlineBlock>
        )
    }
}

export default withRouter(RecentImage);