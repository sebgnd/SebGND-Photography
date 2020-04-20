import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'; 
import styled from 'styled-components';

import { Button, RoundButton } from '../../reusable/button';
import GalleryButton from '../../reusable/gallery-button';
import { SingleImage, RecentImage, ViewerImage } from '../../reusable/image';

import Paths from './../../../data/Paths';
import Image from './../../../data/Image';

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

    render() {
        const placeHolderImage = new Image(1, 1920, 1080, new Date());
        return (
            <>
                <Container>
                    <ViewerImage image={placeHolderImage} />
                </Container>
            </>
        )
    }
}

export default withRouter(Home);