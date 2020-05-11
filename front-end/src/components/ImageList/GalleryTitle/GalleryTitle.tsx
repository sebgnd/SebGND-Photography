import React, { FunctionComponent, Fragment } from 'react';
import { Title } from '../../Styled/text';

import styles from './GalleryTitle.module.css';

interface GalleryTitleProp {
    title: string;
}

const GalleryTitle: FunctionComponent<GalleryTitleProp> = ({ title }) => {
    return (
        <div className={styles.titleContainer}>
            <Title color="black">{title}</Title>
        </div>
    )
} 

export default GalleryTitle;