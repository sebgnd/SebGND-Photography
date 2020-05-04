import React, { Component, FormEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'; 
import styled from 'styled-components';

import { Button, RoundButton } from '../../reusable/button';
import GalleryButton from '../../reusable/gallery-button';
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
                    <form method="POST" action="test" onSubmit={() => console.log('Form submitted')}>
                        <TextField id="test1" type="text-input" placeholder="Test" />
                        <TextField id="test2" type="text-area" placeholder="Test" label="Un label" />
                    </form>
                </Container>
            </>
        )
    }
}

export default withRouter(Home);