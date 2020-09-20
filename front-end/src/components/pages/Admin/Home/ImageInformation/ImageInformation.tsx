import React, { FunctionComponent } from 'react';
import styles from './ImageInformation.module.css';

import Information from './Information/Information';
import InformationHeader from './Information/InformationHeader';
import InformationMessage from '../../../../UI/InformationMessage/InformationMessage';
import Separator from '../../../../UI/Separator/Separator';

import Image from '../../../../../helper/image/Image';
import ImageService from '../../../../../helper/image/ImageService';

interface ImageInformation {
    image: Image | null;   
}

const ImageInformation: FunctionComponent<ImageInformation> = ({ image }) => {
    return (
        <div className={styles.imageInformationContainer}>
            <div className={image === null ? styles.hide : styles.show}>
                <InformationHeader id={image ? image.id : 0} url={image ? ImageService.getUrl(image, 'thumbnail_small') : ''} />
                <Separator size="medium" />
                <Information name="ISO" value={image ? image.iso?.toString() : ""} />
                <Information name="Upload date" value={image ? new Date(image.uploadDate).toLocaleDateString() : ""} />
                <Information name="Shutter Speed" value={image ? image.shutterSpeed : ""} />
                <Information name="Aperture" value={image ? image.aperture : ""} />
                <Information name="Focal Length" value={image ? image.focalLength : ""} />
                <Information name="Resolution" value={image ? `${image.width}x${image.height}` : ""} />
            </div>
            {(image === undefined || image === null) && (
                <div className={styles.informationMessage}>
                    <InformationMessage messageType="information" message="Please select an image." centerHorizontal centerVertical />
                </div>
            )}
        </div>
    )
}

export default ImageInformation;