import React, { Component, FormEvent, Fragment } from 'react';
import styled from 'styled-components';

import Landing from '../../Landing/Landing';
import GalleriesPreview from '../../GalleriesPreview/GalleriesPreview';
import About from '../../About/About';

import Image from '../../../helper/Image';
import Gallery from '../../../helper/Gallery';

import './home.css';

const Container = styled.div`
    display: block;
`
const placeHolderImage = new Image(1, 1920 , 1080, new Date());
const placeholderGallery = new Gallery('test', 'Test', placeHolderImage);

interface HomeState {
    galleries: Gallery[]
}

class Home extends Component<{}, {}> {
    state = {
        galleries: [placeholderGallery, placeholderGallery, placeholderGallery]
    }

    fetchGalleries() {

    }

    handleClick() {

    }

    componentDidMount() {
        
    }

    handleChange(event: FormEvent<HTMLInputElement>) {
        
    }

    render() {
        return (
            <Fragment>
                <Landing />
                <GalleriesPreview galleries={this.state.galleries} />
                <About />
            </Fragment>
        )
    }
}

export default Home;