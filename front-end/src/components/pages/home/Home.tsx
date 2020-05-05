import React, { Component, FormEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'; 
import styled from 'styled-components';

import { Button, RoundButton, GalleryButton } from '../../reusable/button';
import { SingleImage, RecentImage, ViewerImage } from '../../reusable/image';
import { TextField } from '../../reusable/form'

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
                    <GalleryButton image={placeHolderImage} galleryDisplayName="Test" galleryName="test"/>
                </Container>
            </>
        )
    }
}

export default withRouter(Home);