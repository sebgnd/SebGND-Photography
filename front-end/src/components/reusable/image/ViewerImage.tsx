import React, { Component } from 'react';
import Image from '../../../data/Image';
import Paths from '../../../data/Paths';

import './image.css';

type ViewerImageProp = {
    image: Image;

}

class ViewerImage extends Component<ViewerImageProp, {}> {
    fetchExif(id: number) {

    }

    render() {
        //const imageInfo = this.props.image.toExifString();
        const imageInfo = this.props.image?.toExifString();
        const imageSource = Paths.mediumImage();

        return (
            <div id="viewer-image-container">
                <div id="viewer-image">
                    <img src={imageSource} alt="165" />
                    <div id="viewer-image-info">
                        <p>{imageInfo}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewerImage;