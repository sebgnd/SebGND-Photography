import React, { useState, FunctionComponent, useEffect, useRef } from 'react';
import styles from './ImageFade.module.css';

interface ImageFadeProps {
    className?: string;
    src: string;
    alt: string;
    transitionTime?: number;
}

const ImageFade: FunctionComponent<ImageFadeProps> = ({ className, src, alt, transitionTime = .5 }) => {
    const [show, setShow] = useState<boolean>(false);
    const previousImage = useRef(new Set<string>());

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

    useEffect(() => {
        if (previousImage.current.has(src)) {
            setShow(true);
        } else {
            previousImage.current.add(src);
            setShow(false);
        }
    }, [src])

    return (
        <img 
            style={{
                transition: `opacity ${transitionTime}s linear`
            }}
            src={src} 
            className={getClasses()} 
            alt={alt} 
            onLoad={() => {
                setShow(true)
            }} 
        />
    )
};

export default React.memo(ImageFade);