import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ImageList from '../../ImageList/ImageList';

import Image from '../../../helper/image/Image';
import HttpRequest from '../../../helper/http/HttpRequest';
import Category from '../../../helper/category/Category';
import CategoryService from '../../../helper/category/CategoryService';
import ImageService from '../../../helper/image/ImageService';

interface RouteParams {
    id: string;
}

interface GalleryState {
    category: Category;
    images: Image[];
    error: boolean,
    loading: boolean
}

class Gallery extends Component<RouteComponentProps<RouteParams>, GalleryState> {
    state = {  
        category: new Category(),
        images: [],
        error: false,
        loading: true
    }
    async fetchGallery(categoryId: string) {
        const categoryService = new CategoryService();
        const imageService = new ImageService();
        try {
            const category: Category = await categoryService.get(categoryId);
            const images: Image[] = await imageService.getImagesFromCategory(categoryId);

            this.setState({ error: false, loading: false, images, category });

        } catch (e) {
            this.setState({ error: true, loading: false });
        }
    }

    componentDidMount() {
        this.fetchGallery(this.props.match.params.id);
    }

    render() {
        return (
            <ImageList images={this.state.images} category={this.state.category}/>
        )
    }
}

export default Gallery;