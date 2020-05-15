import React, { Component, FormEvent, Fragment } from 'react';
import styled from 'styled-components';
import Parallax from '../../UI/Parallax/Parallax';

import Landing from '../../Landing/Landing';
import GalleriesPreview from '../../GalleryPreview/GalleryPreview';
import About from '../../About/About';

import Image from '../../../helper/image/Image';
import HttpRequest from '../../../helper/http/HttpRequest';
import Category from '../../../helper/category/Category';

interface HomeState {
    thumbnails: Image[];
    error: boolean;
    loading: boolean
}

class Home extends Component<{}, HomeState> {
    state = {
        thumbnails: [],
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
                const thumbnails: Image[] = data.map((category: any) => {
                    const _category = new Category(category.id, category.displayName);
                    const image = new Image(category.thumbnail.id, new Date(category.thumbnail.uploadDate), _category);
                    return image;
                });
                this.setState({ loading: false, thumbnails });
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
                <GalleriesPreview thumbnails={this.state.thumbnails} />
                <Parallax img="images/parallax-2.jpg" speed={0.5} >
                    <About />
                </Parallax>
            </Fragment>
        )
    }
}

export default Home;