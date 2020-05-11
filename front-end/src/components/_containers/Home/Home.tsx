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
interface HomeState {
    galleries: Gallery[];
    error: boolean;
    loading: boolean
}

class Home extends Component<{}, HomeState> {
    state = {
        galleries: [],
        error: false,
        errorMessage: '',
        loading: true,
    }

    fetchGalleries() {
        fetch('http://localhost:8000/galleries/limit/3')
            .then(res => {
                if (res.status !== 200) {
                    this.setState({ error: true, loading: false });
                    return;
                }
                return res.json();
            })
            .then(result => {
                const galleries: Gallery[] = [];
                for (let i = 0; i < result.length; i++) {
                    const thumbnail = new Image(result[i].thumbnail.id, result[i].id, new Date(result[i].thumbnail.uploadDate));
                    galleries.push(new Gallery(result[i].id, result[i].displayName, thumbnail));
                }
                this.setState({ loading: false, galleries });
            })
            .catch(err => {
                this.setState({ error: true, loading: false });
            })
    }

    componentDidMount() {
        this.fetchGalleries();
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