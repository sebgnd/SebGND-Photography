import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ImageList from '../../ImageList/ImageList';

import Image from '../../../helper/image/Image';
import HttpRequest from '../../../helper/http/HttpRequest';
import Category from '../../../helper/Category';

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

    async fetchGallery(galleryId: string) {
        try {
            const data: any | null = await HttpRequest.getData(`http://localhost:8000/images/category/${galleryId}`);
            if (!data) {
                this.setState({ error: true, loading: false });
                return;
            }
            
            if (!this.handleFetchError(data)) {
                const category = new Category(data.id, data.displayName);
                const images = data.images.map((image: any) => new Image(image.id, new Date(image.uploadDate), category));
                this.setState({ error: false, loading: false, images, category });
            }
        } catch (e) {
            this.setError('Something unexpected happened. Please try again later');
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