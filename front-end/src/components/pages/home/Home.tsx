import React, { Component, FormEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'; 
import styled from 'styled-components';

import { Button, RoundButton } from '../../reusable/button';
import GalleryButton from '../../reusable/gallery-button';
import { SingleImage, RecentImage, ViewerImage } from '../../reusable/image';
import { Form, Field } from '../../reusable/form'

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

    handleChange(event: FormEvent<HTMLInputElement>) {
        
    }

    render() {
        const placeHolderImage = new Image(1, 1080, 1920, new Date());
        return (
            <>
                <Container>
                    <Form method="POST" action="test" onSubmit={() => console.log('Form submitted') }>
                        <Field type="textinput" id="test" label="test" placeholder="Please enter the test" />
                        <Field type="textinput" id="another" label="test" placeholder="Please enter another test" />
                        <Field type="textarea" id="anotherone" label="anotherone" placeholder="Please enter" />
                    </Form>
                </Container>
            </>
        )
    }
}

export default withRouter(Home);