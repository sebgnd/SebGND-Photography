import React, { Component, FunctionComponent } from 'react';
import { ViewerImage } from '../UI/Image';
import Image from '../../helper/image/Image';
import styles from './Viewer.module.css';

interface ViewerProps {
    previousImageId: string;
    currentImage: Image;
    nextImageId: string;
}

const Viewer: FunctionComponent<ViewerProps> = ({ previousImageId, currentImage, nextImageId }) => {
    return (
        <div className={styles.viewerContainer}>
            <div className={styles.arrow}>

            </div>
            <div className={styles.image}>
                <ViewerImage 
                    imageId={currentImage.id.toString()} 
                    src={currentImage.getUrl('medium_res')} 
                    imageInfo={currentImage.toExifString()} 
                />
            </div>
            <div className={styles.arrow}>
                
            </div>
        </div>
    );
}

export default Viewer;