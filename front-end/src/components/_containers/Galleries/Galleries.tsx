import React, { Component } from 'react';
import GalleriesList from '../../GalleriesList/GalleriesList';

import Gallery from '../../../helper/Gallery';
import Image from '../../../helper/Image';
import HttpRequest from '../../../helper/HttpRequest';

interface GalleriesState {
    galleries: Gallery[];
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
            const data: any | null = await HttpRequest.getData('http://localhost:8000/galleries');

            if (!this.handleFetchError(data)) {
                const galleries: Gallery[] = data.map((gallery: any) => {
                    const thumbnail = new Image(gallery.thumbnail.id, gallery.id, new Date(gallery.thumbnail.uploadDate));
                    const formattedGallery = new Gallery(gallery.id, gallery.displayName, thumbnail);
                    return formattedGallery;
                })
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