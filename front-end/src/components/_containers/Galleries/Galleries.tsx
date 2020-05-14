import React, { Component } from 'react';
import GalleriesList from '../../GalleriesList/GalleriesList';

import GalleryPreview from '../../../helper/gallery/GalleryPreview';
import Image from '../../../helper/image/Image';
import HttpRequest from '../../../helper/http/HttpRequest';

interface GalleriesState {
    galleries: GalleryPreview[];
    error: boolean,
    loading: boolean,
    errorMessage: string
}

class Galleries extends Component {
    state = {
        galleries: [],
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
                const galleries: GalleryPreview[] = data.map((gallery: any) => GalleryPreview.format(gallery));
                this.setState({ loading: false, galleries });
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
            <GalleriesList galleries={this.state.galleries} />
        )
    }
}

export default Galleries;