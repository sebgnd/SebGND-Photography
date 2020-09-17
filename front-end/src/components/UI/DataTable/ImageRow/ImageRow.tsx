import { property } from 'lodash';
import React, { FunctionComponent } from 'react';
import Image from '../../../../helper/image/Image';
import ImageService from '../../../../helper/image/ImageService';
import styles from './ImageRow.module.css';

interface ImageRowProps {
    image: Image;
    properties?: string[];
}

const ImageRow: FunctionComponent<ImageRowProps> = ({
    image,
    properties
}) => {
    const nbProperties = properties
        ? properties.filter((property: string) => {
            return image[property] !== undefined;
        }).length  
        : 0;

    const basisValue = 100 / (nbProperties + 3);
    const flexBasis = `${basisValue}%`;
    const { id, category } = image;

    return (
        <div className={styles.imageRow}>
            <div style={{ flexBasis }}>
                <img src={ImageService.getUrl(image, 'thumbnail_small')} alt={id.toString()}/>
            </div>
            <div style={{ flexBasis }}>
                <p>{id}</p>
            </div>
            <div style={{ flexBasis }}>
                <p>{category.displayName}</p>
            </div>
            {properties && (
                <>
                    {properties.map((property: string) => {
                        if (image[property]) {
                            return (
                                <div style={{ flexBasis }}>
                                    <p>
                                        {property === 'uploadDate' 
                                            ? new Date(image[property]).toLocaleDateString()
                                            : image[property]
                                        }
                                    </p>
                                </div>
                            )
                        }
                        return null;
                    })}
                </>
            )}
        </div>
    )
}

export default ImageRow;