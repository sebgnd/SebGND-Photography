import React, { FunctionComponent } from 'react';
import { Text } from '../../../Styled/text';

import styles from './ViewerImage.module.css';
import ImageFade from '../ImageFade/ImageFade';

interface ViewerImageProp {
    src: string;
    imageId: string;
    imageInfo: string;
}

const ViewerImage: FunctionComponent<ViewerImageProp> = ({ imageInfo, imageId, src }) => {
    return (
        <div className={styles.viewerImageContainer}>
            <div className={styles.viewerImageWrapper}>
                <ImageFade 
                    className={styles.image} 
                    src={src} 
                    alt={imageId} 
                    transitionTime={.15} 
                />
                <div className={styles.imageInfo}>
                    <Text size="medium" color="black" weight="normal">{imageInfo}</Text>
                </div>
            </div>
        </div>
    )
}

export default ViewerImage;