import React, { Component, FormEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'; 
import styled from 'styled-components';

import { Button, RoundButton } from '../../reusable/button';
import GalleryButton from '../../reusable/gallery-button';
import { SingleImage, RecentImage, ViewerImage } from '../../reusable/image';
import { Form, TextField, IField } from '../../reusable/form'

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

        const fields: IField[] = [
            {
                fieldType: 'textinput',
                id: 'test',
                placeholder: 'Ceci est un test',
                label: 'Ceci est un label',
                rules: {
                    maxLength: 25,
                    notEmpty: true
                }
            },
            {
                fieldType: 'textarea',
                id: 'test-area',
                placeholder: 'Ceci est un autre test',
                rules: {
                    maxLength: 25,
                    notEmpty: true
                }
            }
        ]

        return (
            <>
                <Container>
                    <Form method="POST" action="test" onSubmit={() => console.log('Form submitted')} fields={fields} />
                </Container>
            </>
        )
    }
}

export default withRouter(Home);