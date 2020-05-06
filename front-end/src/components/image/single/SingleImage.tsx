import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ImageContainer, Img, SingleImageContainer } from './single-style';
import { ButtonContainer } from '../../regular/container';

import Image from '../../../helper/Image';
import Paths from '../../../helper/Paths';

interface SingleImageProp extends RouteComponentProps {
    image: Image;
    galleryName: string;
}

const SingleImage: FunctionComponent<SingleImageProp> = (props) => {
    const goToImage = (gallery: string, image: Image) => {
        const id = image.getId().toString();
        const imageLink = `viewer/${props.galleryName}/${id}`;
        props.history.push(imageLink);
    }
    
    const { image, galleryName } = props;
    const imageSource = Paths.mediumThumbnailImage();

    return (
        <SingleImageContainer>
            <ButtonContainer>
                <ImageContainer onClick={() => goToImage(galleryName, image)}>
                    <Img src={imageSource} alt={image.getId().toString()}/>
                </ImageContainer>
            </ButtonContainer>
        </SingleImageContainer>
        )
}

export default withRouter(SingleImage);