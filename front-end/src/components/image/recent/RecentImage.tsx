import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Paths from '../../../helper/Paths';
import Image from '../../../helper/Image';

import { RecentImageContainer, Info, ImageContainer, FillerImage, AdaptedImage, ButtonContainerWidthWidth, GalleryName, InfoContainer, Date } from './recent-image-style';
import { Text } from '../../regular/text';
import { Button } from '../../button';

interface RecentImageProp extends RouteComponentProps {
    image: Image;
    galleryDisplayName: string;
    galleryName: string;
}

const RecentImage: FunctionComponent<RecentImageProp> = (props) => {
    const goToGallery = (name: string) => {
        const galleryLink = `gallery/${name}`;
        props.history.push(galleryLink);
    }

    const goToImage = (id: number, fromGallery: string) => {
        const imageLink = `viewer/${fromGallery}/${id.toString()}`;
        props.history.push(imageLink);
    }

    const { image, galleryDisplayName, galleryName } = props;
    const formattedDate: string = image.getFormatedDate();
    const id: string = image.getId().toString();
    const imageType: string = image.isPortrait() ? 'portrait' : 'landscape';
    const imageSource = Paths.smallImage();
    
    return (
        <RecentImageContainer>
            <Info>
                <InfoContainer>
                    <GalleryName>
                        <Button variant="light" size="small" onClick={() => goToGallery(galleryName)}>{galleryDisplayName}</Button>
                    </GalleryName>
                </InfoContainer>

                <InfoContainer>
                    <Date>
                        <Text size="small" color="#7E7E7E" weight="bold">{formattedDate}</Text>
                    </Date>
                </InfoContainer>
            </Info>
            
            <ImageContainer>
                <ButtonContainerWidthWidth width="100%" onClick={() => goToImage(image.getId(), galleryName)}>
                    { image.isPortrait() && (
                        <FillerImage src={imageSource} alt={id} />
                    )}
                    <AdaptedImage type={imageType} src={imageSource} alt={id} />
                </ButtonContainerWidthWidth>
            </ImageContainer>
        </RecentImageContainer>
    )
}

export default withRouter(RecentImage);