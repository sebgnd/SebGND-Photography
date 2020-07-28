import React, { Component } from 'react';
import GalleryList from './GalleryList/GalleryList';

import Image from '../../../helper/image/Image';
import Category from '../../../helper/category/Category';
import CategoryService from '../../../helper/category/CategoryService';
import CategoryThumbnail from '../../../helper/category/CategoryThumbnail';

interface GalleriesState {
    thumbnails: CategoryThumbnail[];
    error: boolean,
    loading: boolean,
    errorMessage: string
}

class Galleries extends Component {
    state = {
        thumbnails: [],
        error: false,
        loading: true,
        errorMessage: ''
    }

    async fetchGalleries() {
        try {
            const thumbnails: CategoryThumbnail[] = await CategoryService.getAllThumbnail();
            
            console.log(thumbnails);

            this.setState({
                error: false,
                loading: false,
                thumbnails
            })

        } catch (e) {
            console.log(e);
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
            <GalleryList thumbnails={this.state.thumbnails} />
        )
    }
}

export default Galleries;