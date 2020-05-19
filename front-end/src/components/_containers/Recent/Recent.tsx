import React, { Component, Fragment } from 'react';
import Loader from '../../UI/Loader/Loader';
import Image from '../../../helper/image/Image';
import RecentList from '../../RecentList/RecentList';
import ImageService from '../../../helper/image/ImageService';

interface RecentState {
    images: Image[];
    error: boolean;
    loading: boolean;
    errorMessage: string;
    nbImagesLoaded: number;
}

const NB_IMAGE_PER_FETCH: number = 5;
const MIN_TIME_BETWEEN_FETCH: number = 500;

class Recent extends Component<{}, RecentState> {
    constructor(props = {}) {
        super(props)
        this.fetchImages = this.fetchImages.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    state = {
        images: [],
        error: false,
        loading: false,
        errorMessage: '',
        nbImagesLoaded: 0,
    }


    // TODO: When fetching new images => set loading to true
    // TODO: Can load new image every second
    async fetchImages() {
        if (this.state.loading) {
            return;
        }

        const imageService = new ImageService();
        try {
            this.setState({ loading: true });
            const { nbImagesLoaded, images } = this.state;
            const newImages: Image[] = await imageService.getKImagesFromOffset(NB_IMAGE_PER_FETCH, nbImagesLoaded);

            this.setState(prevState => {
                return {
                    loading: false, 
                    error: false,
                    images: [...prevState.images, ...newImages], 
                    nbImagesLoaded: prevState.nbImagesLoaded + newImages.length 
                }
            });

        } catch (e) {
            this.setState({ loading: false, error: true, errorMessage: e.message});
        }
    }

    handleScroll() {
        const scrollYBottom = Math.round(window.scrollY + window.innerHeight);
        const pageHeight = document.body.scrollHeight;
        const offsetThreshold = 50;

        if (scrollYBottom > pageHeight - offsetThreshold) {
            this.fetchImages();
        }
    }

    componentDidMount() {
        this.fetchImages();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {   
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <Fragment>
                <RecentList images={this.state.images} />
                { this.state.loading && (
                    <Loader />
                )}
            </Fragment>
        )
    }
}

export default Recent;