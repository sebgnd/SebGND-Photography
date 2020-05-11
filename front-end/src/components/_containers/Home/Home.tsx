import React, { Component, FormEvent, Fragment } from 'react';
import styled from 'styled-components';

import Landing from '../../Landing/Landing';
import GalleriesPreview from '../../GalleriesPreview/GalleriesPreview';
import About from '../../About/About';

import Image from '../../../helper/Image';
import Gallery from '../../../helper/Gallery';
import Parallax from '../../UI/Parallax/Parallax';

const Container = styled.div`
    display: block;
`
const placeholderGallery = new Gallery('test', 'Test');
const placeHolderImage = new Image(1, 1920 , 1080, new Date(), placeholderGallery);
placeholderGallery.setThumbnail(placeHolderImage);

interface HomeState {
    galleries: Gallery[]
}

class Home extends Component<{}, HomeState> {
    state = {
        galleries: [placeholderGallery, placeholderGallery, placeholderGallery]
    }

    fetchGalleries() {

    }

    componentDidMount() {
        
    }

    render() {
        return (
            <Fragment>
                <Parallax img="images/parallax-1.jpg" speed={0.5}>
                    <Landing />
                </Parallax>
                <GalleriesPreview galleries={this.state.galleries} />
                <Parallax img="images/parallax-2.jpg" speed={0.5} >
                    <About />
                </Parallax>
            </Fragment>
        )
    }
}

export default Home;