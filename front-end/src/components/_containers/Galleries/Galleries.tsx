import React, { Component } from 'react';
import GalleriesList from '../../GalleryList/GalleryList';

import Image from '../../../helper/image/Image';
import Category from '../../../helper/category/Category';
import HttpRequest from '../../../helper/http/HttpRequest';
import CategoryService from '../../../helper/category/CategoryService';

interface GalleriesState {
    categories: Category[];
    error: boolean,
    loading: boolean,
    errorMessage: string
}

class Galleries extends Component {
    state = {
        categories: [],
        error: false,
        loading: true,
        errorMessage: ''
    }

    async fetchGalleries() {
        try {
            const categoryService = new CategoryService();
            const categories = await categoryService.getAll();
            
            this.setState({
                error: false,
                loading: false,
                categories
            })

        } catch (e) {
            this.setState({
                error: true,
                loading: false,
                errorMessage: e.message
            })
        }
    }

    componentDidMount() {
        this.fetchGalleries();
    }

    render() {
        return (
            <GalleriesList categories={this.state.categories} />
        )
    }
}

export default Galleries;