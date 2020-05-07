import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ImageContainer, Img, SingleImageContainer } from './single-style';
import { ButtonContainer } from '../../regular/container';

import Image from '../../../helper/Image';
import Gallery from '../../../helper/Gallery';
import Paths from '../../../helper/Paths';

interface SingleImageProp extends RouteComponentProps {
    image: Image;
    gallery: Gallery;
}

const SingleImage: FunctionComponent<SingleImageProp> = (props) => {
    const { image, gallery } = props;
    const imageSource = Paths.mediumThumbnailImage();

    const goToImage = () => {
        const id = image.getId().toString();
        const imageLink = `viewer/${gallery.getId()}/${id}`;
        props.history.push(imageLink);
    }

    return (
        <SingleImageContainer>
            <ButtonContainer>
                <ImageContainer onClick={() => goToImage()}>
                    <Img src={imageSource} alt={image.getId().toString()}/>
                </ImageContainer>
            </ButtonContainer>
        </SingleImageContainer>
        )
}

export default withRouter(SingleImage);