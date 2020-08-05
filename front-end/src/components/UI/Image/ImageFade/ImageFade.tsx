import React, { useState, FunctionComponent } from 'react';
import styles from './ImageFade.module.css';

interface ImageFadeProps {
    className?: string;
    src: string;
    alt: string
}

const ImageFade: FunctionComponent<ImageFadeProps> = ({ className, src, alt }) => {
    const [show, setShow] = useState<boolean>(false);

    const getClasses = () => {
        const currentClass = className ? className : '';
        const classes = [currentClass, styles.image];
        
        if (show) {
            classes.push(styles.show);
        } else {
            classes.push(styles.hide);
        }
        return classes.join(' ');
    }

    const toggleShow = () => {
        setShow(prevShow => !prevShow);
    }

    return (
        <img src={src} className={getClasses()} alt={alt} onLoad={() => toggleShow()} />
    )
};

export default ImageFade;