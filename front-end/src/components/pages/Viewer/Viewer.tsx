import React, { Component, Fragment } from 'react';
import { RouteComponentProps, } from 'react-router-dom';
import Image from '../../../helper/image/Image';
import ImageService from '../../../helper/image/ImageService';
import { ViewerImage } from '../../UI/Image';

interface RouteParams {
    category: string;
    id: string;
}

interface ViewerState {
    image: Image | null;
    error: boolean;
    loading: boolean;
}

class Viewer extends Component<RouteComponentProps<RouteParams>, ViewerState> {
    constructor(props: RouteComponentProps<RouteParams>) {
        super(props);
        this.state = {
            error: false,
            loading: true,
            image: null
        }
    }

    async fetchImage(categoryId: string, imgId: number) {
        try {
            const imageService = new ImageService();
            const image = await imageService.get(imgId);

            this.setState({
                error: false,
                loading: false,
                image
            });

        } catch (e) {
            this.setState({ error: true, loading: false });
        }
    }

    componentDidMount() {
        const imgId = this.props.match.params.id;
        const categoryId = this.props.match.params.category;
        this.fetchImage(categoryId, parseInt(imgId));
    }

    render() {
        return (
            <Fragment>
                {(!this.state.loading && this.state.image) ? (
                    <ViewerImage src={this.state.image.getUrl('medium_res')} imageId={this.state.image.id.toString()} imageInfo={this.state.image.toExifString()} />
                ) : (
                    null
                )}
            </Fragment>
        )
    }
}

export default Viewer;