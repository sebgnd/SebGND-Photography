import React, { Component, FormEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'; 
import styled from 'styled-components';

import { Button, RoundButton, GalleryButton } from '../../button';
import { SingleImage, RecentImage, ViewerImage } from '../../image';
import { TextField } from '../../form'

import { TextContainer } from '../../regular/container';
import { Text } from '../../regular/text';

import Paths from '../../../helper/Paths';
import Image from '../../../helper/Image';

import './home.css';

const Container = styled.div`
    display: block;
`

class Home extends Component<RouteComponentProps, {}> {

    fetchGalleries() {

    }

    handleClick() {
        console.log('Test');
    }

    componentDidMount() {

    }

    handleChange(event: FormEvent<HTMLInputElement>) {
        
    }

    render() {
        const placeHolderImage = new Image(1, 1080, 1920, new Date());
        return (
            <>
                <Container>
                    <GalleryButton image={placeHolderImage} galleryDisplayName="Test" galleryName="test" />
                </Container>
            </>
        )
    }
}

export default withRouter(Home);