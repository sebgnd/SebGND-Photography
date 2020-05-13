import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ImageList from '../../ImageList/ImageList';

import Image from '../../../helper/Image';
import Gallery from '../../../helper/Gallery';
import HttpRequest from '../../../helper/HttpRequest';

const placeHolderImage = new Image(1, 'test', new Date());
const placeholderGallery = new Gallery('test', 'Test', placeHolderImage);

interface RouteParams {
    id: string;
}

interface SingleGalleryState {
    gallery: Gallery;
    error: boolean,
    loading: boolean
}

class SingleGallery extends Component<RouteComponentProps<RouteParams>, SingleGalleryState> {
    state = {  
        gallery: new Gallery(),
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
            const data: any | null = await HttpRequest.getData(`http://localhost:8000/images/gallery/${galleryId}`);

            if (!data) {
                this.setState({ error: true, loading: false });
                return;
            }
            
            if (this.handleFetchError(data)) {
                const gallery = new Gallery(data.id, data.displayName);
                for (let i = 0; i < data.images.length; i++) {
                    const image = new Image(data.images[i].id, data.images[i].galleryId, new Date(data.images[i].uploadDate));
                    gallery.addImage(image);
                }
                this.setState({ error: false, loading: false, gallery });
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
            <ImageList images={this.state.gallery.images} galleryDisplayName={this.state.gallery.displayName}/>
        )
    }
}

export default SingleGallery;