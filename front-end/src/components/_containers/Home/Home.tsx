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

    async getData(url: string) {
        const result: Response = await fetch('http://localhost:8000/galleries/limit/3');
        const data: any | null = result.ok ? await result.json() : null;
        return data;
    }

    async fetchGalleries() {
        const data = await this.getData('http://localhost:8000/galleries/limit/3');

        if (!data) {
            this.setState({ error: true, loading: false });
            return;
        }

        const galleries: Gallery[] = [];
        for (let i = 0; i < data.length; i++) {
            const thumbnail: Image = new Image(data[i].thumbnail.id, data[i].id, new Date(data[i].thumbnail.uploadDate));
            const gallery: Gallery = new Gallery(data[i].id, data[i].displayName, thumbnail);
            galleries.push(gallery);
        }
        this.setState({ loading: false, galleries });
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