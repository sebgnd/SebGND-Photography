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
    images: Image[];
    error: boolean,
    loading: boolean
}

class SingleGallery extends Component<RouteComponentProps<RouteParams>, SingleGalleryState> {
    state = {  
        gallery: new Gallery(),
        images: [],
        error: false,
        loading: true
    }

    fetchImages(id: string) {
        fetch(`http://localhost:8000/images/gallery/${id}`)
        .then(res => {
            if (res.status !== 200) {
                this.setState({ error: true, loading: false });
                return;
            }
            return res.json();
        })
        .then(result => {
            const images: Image[] = [];
            let gallery: Gallery = new Gallery();
            for (let i = 0; i < result.length; i++) {
                if (!gallery) {
                    gallery = new Gallery(result[i].gallery.id, result[i].gallery.displayName);
                }
                images.push(new Image(result[i].id, result[i].gallery.id, new Date(result[i].uploadDate)));
            }
            this.setState({ loading: false, images, gallery });
        })
        .catch(err => {
            this.setState({ error: true, loading: false });
        })
    }

    componentDidMount() {
        const galleryId = this.props.match.params.id;
        this.fetchImages(galleryId);
    }

    render() {
        return (
            <ImageList images={this.state.images} gallery={this.state.gallery}/>
        )
    }
}

export default SingleGallery;