import React, { Component } from 'react';
import { Button } from '../../UI/Button';
import HttpRequest from '../../../helper/http/HttpRequest';
import Image from '../../../helper/image/Image';
import Category from '../../../helper/Category';

interface RecentState {
    images: Image[];
    error: boolean;
    loading: boolean;
    errorMessage: string;
    nbImagesLoaded: number;
    canLoad: boolean;
}

const NB_IMAGE_PER_FETCH: number = 5;

class Recent extends Component<{}, RecentState> {
    private canLoad: boolean = true;

    state = {
        images: [],
        error: false,
        loading: true,
        canLoad: true,
        errorMessage: '',
        nbImagesLoaded: 0,
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

    // TODO: When fetching new images => set loading to true
    // TODO: Can load new image every second
    async fetchImages(offset: number) {
        if (!this.canLoad) {
            return;
        }

        try {
            const data: any | null = await HttpRequest.getData(`http://localhost:8000/images/${offset}/${NB_IMAGE_PER_FETCH}`);
            const images: Image[] = [...this.state.images];
            const { nbImagesLoaded } = this.state;

            if (!this.handleFetchError(data)) {
                data.forEach((curImage: any) => {
                    const category: Category = new Category(curImage.category.id, curImage.category.displayName); 
                    const image: Image = new Image(curImage.id, new Date(curImage.uploadDate), category);
                    images.push(image);
                });
                this.setState({ nbImagesLoaded: nbImagesLoaded + data.length, loading: false });
            }
        } catch (e) {
            this.setError('Something unexpected happened. Try again later.');
        }
    }

    handleScroll() {

    }

    componentDidMount() {
        this.fetchImages(0);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <Button variant="classic" size="medium" onClick={() => this.fetchImages(this.state.nbImagesLoaded)}>Load</Button>
        )
    }
}

export default Recent;