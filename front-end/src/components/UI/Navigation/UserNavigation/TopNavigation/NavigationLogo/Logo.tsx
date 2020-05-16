import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

interface LogoProps {
    imgSrc: string;
    imgAlt: string;
    url: string;
}

const Logo: FunctionComponent<LogoProps> = ({ imgSrc, imgAlt, url }) => {
    return (
        <Link to={url} className={styles.logo}>
            <img src={imgSrc} alt={imgAlt}/>
        </Link>
    )
}

export default Logo;