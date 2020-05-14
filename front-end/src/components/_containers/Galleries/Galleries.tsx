import React, { Component } from 'react';
import GalleriesList from '../../GalleriesList/GalleriesList';

import GalleryThumbnail from '../../../helper/gallery/GalleryThumbnail';
import HttpRequest from '../../../helper/http/HttpRequest';

interface GalleriesState {
    galleries: GalleryThumbnail[];
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
            const data: any | null = await HttpRequest.getData('http://localhost:8000/categories');

            if (!this.handleFetchError(data)) {
                const thumbnails: GalleryThumbnail[] = data.map((category: any) => GalleryThumbnail.format(category));
                this.setState({ loading: false, thumbnails });
            }
        } catch (e) {
            this.setError('Something unexpected happened. Please try again later.');
        }
    }

    componentDidMount() {
        this.fetchGalleries();
    }

    render() {
        return (
            <GalleriesList thumbnails={this.state.thumbnails} />
        )
    }
}

export default Galleries;