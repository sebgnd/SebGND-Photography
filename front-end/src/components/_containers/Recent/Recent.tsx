import React, { Component, Fragment } from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import Image from '../../../helper/image/Image';
import RecentList from '../../RecentList/RecentList';
import ImageService from '../../../helper/image/ImageService';
import withEndScroll, { EndScrollProps } from '../../HOC/withEndScroll';
import { isCompositeComponent } from 'react-dom/test-utils';

interface RecentState {
    images: Image[];
    error: boolean;
    loading: boolean;
    errorMessage: string;
    nbImagesLoaded: number;
}

const NB_IMAGE_PER_FETCH: number = 5;
const MIN_TIME_BETWEEN_FETCH: number = 250;

class Recent extends Component<EndScrollProps, RecentState> {
    constructor(props: EndScrollProps) {
        super(props)
        this.fetchImages = this.fetchImages.bind(this);
        this.setState = this.setState.bind(this);
    }

    state = {
        images: [],
        error: false,
        loading: false,
        errorMessage: '',
        nbImagesLoaded: 0,
    }

    async fetchImages() {
        if (this.state.loading) {
            return;
        }

        const imageService = new ImageService();
        try {
            this.setState({ loading: true });
            const { nbImagesLoaded, images } = this.state;
            const newImages: Image[] = await imageService.getKFromOffset(NB_IMAGE_PER_FETCH, nbImagesLoaded);

            setTimeout(() => {
                this.setState(prevState => {
                    return {
                        loading: false, 
                        error: false,
                        images: [...prevState.images, ...newImages], 
                        nbImagesLoaded: prevState.nbImagesLoaded + newImages.length 
                    }
                });
            }, MIN_TIME_BETWEEN_FETCH)

        } catch (e) {
            this.setState({ loading: false, error: true, errorMessage: e.message});
        }
    }

    componentDidMount() {
        this.fetchImages();
    }

    componentDidUpdate(prevProps: EndScrollProps, prevState: RecentState) {
        const { endWindowReached } = this.props;
        
        if (endWindowReached !== prevProps.endWindowReached && endWindowReached) {
            if (this.state === prevState) {
                this.fetchImages();
            }
        }
    }

    render() {
        return (
            <Fragment>
                <RecentList images={this.state.images} />
                { this.state.loading && (
                    <Spinner center={true} />
                )}
            </Fragment>
        )
    }
}

const log = () => {
    console.log('Trigger');
}

export default withEndScroll(Recent);