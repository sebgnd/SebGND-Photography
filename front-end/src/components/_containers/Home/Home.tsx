import React, { Component, FormEvent, Fragment } from 'react';
import styled from 'styled-components';
import Parallax from '../../UI/Parallax/Parallax';

import Landing from '../../Landing/Landing';
import GalleriesPreview from '../../GalleriesPreview/GalleriesPreview';
import About from '../../About/About';

import Image from '../../../helper/image/Image';
import GalleryPreview from '../../../helper/gallery/GalleryPreview';
import HttpRequest from '../../../helper/http/HttpRequest';

interface HomeState {
    galleries: GalleryPreview[];
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

    setError(errorMessage: string) {
        this.setState({ error: true, loading: false });
    }

    handleFetchError(data: any | null): boolean {
        if (!data) {
            this.setError('Something unexptected happened. Please try again later.');
            return true;
        }
        if (data.error) {
            this.setError(data.error.message);
            return true;
        }
        return false;
    }

    async fetchGalleries() {
        try {
            const data: any | null = await HttpRequest.getData('http://localhost:8000/categories/limit/3');

            if (!this.handleFetchError(data)) {
                const galleries: GalleryPreview[] = data.map((gallery: any) => GalleryPreview.format(gallery));
                this.setState({ loading: false, galleries });
            }
        } catch (e) {
            this.setError('Something unexptected happened. Please try again later');
        }
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