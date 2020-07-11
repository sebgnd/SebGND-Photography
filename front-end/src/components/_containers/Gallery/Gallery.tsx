import React, { Component, MouseEvent } from 'react';
import { RouteComponentProps, withRouter, Route, Switch } from 'react-router-dom';
import ImageList from '../../ImageList/ImageList';
import Viewer from '../../Viewer/Viewer';

import Image from '../../../helper/image/Image';
import Category from '../../../helper/category/Category';
import CategoryService from '../../../helper/category/CategoryService';
import ImageService from '../../../helper/image/ImageService';

interface RouteParams {
    id: string;
}

interface GalleryState {
    category: Category;
    images: Image[];
    error: boolean,
    loading: boolean
}

class Gallery extends Component<RouteComponentProps<RouteParams>, GalleryState> {
    constructor(props: RouteComponentProps<RouteParams>) {
        super(props);

        this.handleImageClick = this.handleImageClick.bind(this);
    }

    state = {  
        category: new Category(),
        images: [],
        error: false,
        loading: true
    }
    
    async fetchGallery(categoryId: string) {
        const categoryService = new CategoryService();
        const imageService = new ImageService();
        try {
            const category: Category = await categoryService.get(categoryId);
            const images: Image[] = await imageService.getFromCategory(categoryId);

            this.setState({ 
                error: false, 
                loading: false, 
                images, 
                category 
            });

        } catch (e) {
            this.setState({ error: true, loading: false });
        }
    }

    handleImageClick(event: MouseEvent, imageId: string, categoryId: string) {
        this.props.history.push(`/gallery/${categoryId}/${imageId}`);
    }

    componentDidMount() {
        this.fetchGallery(this.props.match.params.id);
    }

    render() {
        return (
            <>
                <ImageList 
                    images={this.state.images} 
                    category={this.state.category}
                    onImageClick={this.handleImageClick}
                />
                {/*
                    <Switch>
                        <Route exact={true} path="/gallery/:id/:imageId">
                            <Viewer />
                        </Route>
                    </Switch>
                */}
            </>

        )
    }
}

export default withRouter(Gallery);