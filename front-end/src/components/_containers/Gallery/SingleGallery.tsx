import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ImageList from '../../ImageList/ImageList';

import Image from '../../../helper/Image';
import Gallery from '../../../helper/Gallery';

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

    async getData(url: string) {
        const result: Response = await fetch(url);
        const data: any | null = result.ok ? await result.json() : null;
        return data;
    }

    async fetchGallery(galleryId: string) {
        const data: any | null = await this.getData(`http://localhost:8000/images/gallery/${galleryId}`);

        if (!data) {
            this.setState({ error: true, loading: false });
            return;
        }
        console.log(data);
        const gallery = new Gallery(data.id, data.displayName);
        for (let i = 0; i < data.images.length; i++) {
            gallery.addImage(new Image(data.images[i].id, data.images[i].galleryId, new Date(data.images[i].uploadDate)));
        }
        this.setState({ error: false, loading: false, gallery })
    }

    componentDidMount() {
        this.fetchGallery(this.props.match.params.id);
    }

    render() {
        return (
            <ImageList images={this.state.gallery.getImages()} galleryDisplayName={this.state.gallery.getDisplayName()}/>
        )
    }
}

export default SingleGallery;