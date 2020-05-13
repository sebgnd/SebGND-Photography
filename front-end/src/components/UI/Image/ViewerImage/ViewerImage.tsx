import React, { FunctionComponent } from 'react';
import { Text } from '../../../Styled/text';

import styles from './ViewerImage.module.css';

import Image from '../../../../helper/Image';
import Paths from '../../../../helper/Paths';

interface ViewerImageProp {
    image: Image;
}

const ViewerImage: FunctionComponent<ViewerImageProp> = (props) => {
    const imageInfo = props.image.toExifString();
    const imageSource = Paths.mediumImage();

    return (
        <div className={styles.viewerImageContainer}>
            <div className={styles.viewerImageWrapper}>
                <img className={styles.image} src={imageSource} alt={props.image.id.toString()} />
                <div className={styles.imageInfo}>
                    <Text size="medium" color="black" weight="normal">{imageInfo}</Text>
                </div>
            </div>
        </div>
    )
}

export default ViewerImage;