import React, { Component, FormEvent, Fragment } from 'react';
import styled from 'styled-components';
import Parallax from '../../UI/Parallax/Parallax';

import Landing from '../../Landing/Landing';
import GalleriesPreview from '../../GalleryPreview/GalleryPreview';
import About from '../../About/About';

import Image from '../../../helper/image/Image';
import HttpRequest from '../../../helper/http/HttpRequest';
import Category from '../../../helper/category/Category';
import CategoryService from '../../../helper/category/CategoryService';

interface HomeState {
    categories: Category[];
    error: boolean;
    loading: boolean;
    errorMessage: string;
}

class Home extends Component<{}, HomeState> {
    state = {
        categories: [],
        error: false,
        errorMessage: '',
        loading: true,
    }

    async fetchGalleries() {
        try {
            const categoryService = new CategoryService();
            const categories: Category[] = await categoryService.getK(3);
            
            this.setState({
                error: false,
                loading: false,
                categories
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
                <GalleriesPreview categories={this.state.categories} />
                <Parallax img="images/parallax-2.jpg" speed={0.5} >
                    <About />
                </Parallax>
            </Fragment>
        )
    }
}

export default Home;