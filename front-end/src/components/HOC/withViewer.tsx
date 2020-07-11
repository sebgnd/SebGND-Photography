import React, { Component } from 'react';
import Image from '../../helper/image/Image';

// ViewerState or ViewerProps
interface ViewerState {
    previousImageId: string;
    currentImage: Image;
    nextImageId: string;
}

const withViewer = (WrappedComponent: Component<{}, {}>) => {
    return class extends Component<{}, {}> {
        render() {
            return (
                null
            )
        }
    }
}

export default withViewer;