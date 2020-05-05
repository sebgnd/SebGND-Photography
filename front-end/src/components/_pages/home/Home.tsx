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
                    <TextContainer>
                        <Text size="big" weight="normal">
                            My name is Sebastien Gnd and i am a French amateur photographer based in Limoges, France. My passion for photography dates back to 2016 when I was in high school. My other passions include technology, video games, cars, cinema … I am studying in Computer Science.
                        </Text>
                    </TextContainer>
                </Container>
            </>
        )
    }
}

export default withRouter(Home);