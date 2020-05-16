import React, { FunctionComponent } from 'react';
import { Text } from '../../../Styled/text';

import styles from './ViewerImage.module.css';

import Image from '../../../../helper/image/Image';
import Paths from '../../../../helper/Paths';

interface ViewerImageProp {
    src: string;
    imageId: string;
    imageInfo: string;
}

const ViewerImage: FunctionComponent<ViewerImageProp> = ({ imageInfo, imageId, src }) => {
    return (
        <div className={styles.viewerImageContainer}>
            <div className={styles.viewerImageWrapper}>
                <img className={styles.image} src={src} alt={imageId} />
                <div className={styles.imageInfo}>
                    <Text size="medium" color="black" weight="normal">{imageInfo}</Text>
                </div>
            </div>
        </div>
    )
}

export default ViewerImage;