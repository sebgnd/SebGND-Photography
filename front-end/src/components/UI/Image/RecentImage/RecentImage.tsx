import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Paths from '../../../../helper/Paths';
import Image from '../../../../helper/Image';
import Gallery from '../../../../helper/Gallery';

import AdaptedImage from './AdaptedImage';
import { Text } from '../../../Styled/text';
import { ButtonContainerWidthWidth } from '../../../Styled/container';
import { Button } from '../../Button';

import styles from './RecentImage.module.css';

interface RecentImageProp extends RouteComponentProps {
    image: Image;
    gallery: Gallery;
}

const RecentImage: FunctionComponent<RecentImageProp> = (props) => {
    const goToGallery = (id: string) => {
        props.history.push(`gallery/${id}`);
    }

    const goToImage = (id: number, fromGallery: string) => {
        props.history.push(`viewer/${fromGallery}/${id.toString()}`);
    }

    const { image, gallery } = props;
    const formattedDate: string = image.getFormatedDate();
    const id: string = image.id.toString();
    const imageType: string = image.isPortrait() ? 'portrait' : 'landscape';
    const imageSource = Paths.smallImage();
    
    return (
        <div className={styles.recentImageContainer}>
            <div className={styles.info}>
                <div className={styles.infoContainer}>
                    <div className={styles.galleryName}>
                        <Button variant="light" size="small" onClick={() => goToGallery(gallery.id)}>{gallery.displayName}</Button>
                    </div>
                </div>

                <div className={styles.infoContainer}>
                    <div className={styles.date}>
                        <Text size="small" color="#7E7E7E" weight="bold">{formattedDate}</Text>
                    </div>
                </div>
            </div>
            
            <div className={styles.imageContainer}>
                <ButtonContainerWidthWidth width="100%" onClick={() => goToImage(image.id, gallery.id)}>
                    { image.isPortrait() && (
                        <img className={styles.fillerImage} src={imageSource} alt={id} />
                    )}
                    <AdaptedImage type={imageType} src={imageSource} alt={id} />
                </ButtonContainerWidthWidth>
            </div>
        </div>
    )
}

export default withRouter(RecentImage);