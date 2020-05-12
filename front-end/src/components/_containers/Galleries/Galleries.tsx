import React, { Component } from 'react';
import GalleriesList from '../../GalleriesList/GalleriesList';

import Gallery from '../../../helper/Gallery';
import Image from '../../../helper/Image';

interface GalleriesState {
    galleries: Gallery[];
}

class Galleries extends Component {
    state = {
        galleries: []
    }

    fetchGalleries() {
        fetch('http://localhost:8000/galleries')
            .then(res => {
                if (res.status !== 200) {
                    this.setState({ error: true, loading: false });
                    return;
                }
                return res.json();
            })
            .then(result => {
                const galleries: Gallery[] = [];
                for (let i = 0; i < result.length; i++) {
                    const thumbnail = new Image(result[i].thumbnail.id, result[i].id, new Date(result[i].thumbnail.uploadDate));
                    galleries.push(new Gallery(result[i].id, result[i].displayName, thumbnail));
                }
                this.setState({ loading: false, galleries });
            })
            .catch(err => {
                this.setState({ error: true, loading: false });
            })
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