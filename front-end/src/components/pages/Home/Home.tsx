import React, { Component, FormEvent, Fragment } from 'react';
import styled from 'styled-components';
import Parallax from '../../UI/Parallax/Parallax';

import Landing from './Landing/Landing';
import GalleriesPreview from './GalleryPreview/GalleryPreview';
import About from './About/About';

import Image from '../../../helper/image/Image';
import HttpRequest from '../../../helper/http/HttpRequest';
import Category from '../../../helper/category/Category';
import CategoryThumbnail from '../../../helper/category/CategoryThumbnail';
import CategoryService from '../../../helper/category/CategoryService';

interface HomeState {
    thumbnails: CategoryThumbnail[];
    error: boolean;
    loading: boolean;
    errorMessage: string;
}

class Home extends Component<{}, HomeState> {
    state = {
        thumbnails: [],
        error: false,
        errorMessage: '',
        loading: true,
    }

    async fetchGalleries() {
        try {
            const categoryService = new CategoryService();
            const thumbnails: CategoryThumbnail[] = await categoryService.getKThumbnail(3);

            this.setState({
                error: false,
                loading: false,
                thumbnails
            });

        } catch (e) {
            this.setState({
                error: true,
                loading: false,
                errorMessage: e.message
            });
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