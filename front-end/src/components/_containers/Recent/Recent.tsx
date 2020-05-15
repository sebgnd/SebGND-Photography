import React, { Component } from 'react';
import { Button } from '../../UI/Button';
import HttpRequest from '../../../helper/http/HttpRequest';
import Image from '../../../helper/image/Image';
import ImageService from '../../../helper/image/ImageService';

interface RecentState {
    images: Image[];
    error: boolean;
    loading: boolean;
    errorMessage: string;
    nbImagesLoaded: number;
    canLoad: boolean;
}

const NB_IMAGE_PER_FETCH: number = 5;
const MIN_TIME_BETWEEN_FETCH: number = 1000;

class Recent extends Component<{}, RecentState> {
    enableLoadTimeout: number = -1;
    state = {
        images: [],
        error: false,
        loading: true,
        canLoad: true,
        errorMessage: '',
        nbImagesLoaded: 0,
    }


    // TODO: When fetching new images => set loading to true
    // TODO: Can load new image every second
    async fetchImages() {
        if (!this.state.canLoad) {
            return;
        }

        const imageService = new ImageService();
        try {
            this.setState({ loading: true });
            const { nbImagesLoaded, images } = this.state;
            const newImages: Image[] = await imageService.getKImagesFromOffset(NB_IMAGE_PER_FETCH, nbImagesLoaded);

            this.setState({ 
                loading: false, 
                error: false, 
                canLoad: false, 
                images: [...images, ...newImages], 
                nbImagesLoaded: nbImagesLoaded + newImages.length 
            });

        } catch (e) {
            this.setState({ loading: false, error: true, errorMessage: e.message});
        }
    }

    handleScroll() {

    }

    componentDidMount() {
        this.fetchImages();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps: {}, prevState: RecentState) {
        if (prevState.canLoad !== this.state.canLoad) {
            this.enableLoadTimeout = setTimeout(() => {
                this.setState({ canLoad: true })
            }, MIN_TIME_BETWEEN_FETCH);
        }
    }

    componentWillUnmount() {   
        window.removeEventListener('scroll', this.handleScroll);
        if (this.enableLoadTimeout !== -1) {
            clearTimeout(this.enableLoadTimeout);
        }
    }

    render() {
        return (
            <Button variant="classic" size="medium" onClick={() => this.fetchImages()}>Load</Button>
        )
    }
}

export default Recent;