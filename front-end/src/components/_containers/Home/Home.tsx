import React, { Component, FormEvent, Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'; 
import styled from 'styled-components';

import { Button, RoundButton, GalleryButton } from '../../Button';
import { SingleImage, RecentImage, ViewerImage } from '../../Image';
import { TextField } from '../../Form'

import { TextContainer } from '../../regular/container';
import { Text } from '../../regular/text';

import Landing from '../../Landing/Landing';

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
            <Fragment>
                <Landing />
                <div style={{height: '1000px', backgroundColor: 'black'}} />
                <Landing />
                <div style={{height: '100px', backgroundColor: 'black'}} />
                <Landing />
            </Fragment>
        )
    }
}

export default withRouter(Home);