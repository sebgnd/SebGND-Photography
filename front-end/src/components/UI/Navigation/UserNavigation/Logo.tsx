import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
    imgSrc: string;
    imgAlt: string;
    url: string;
}

const Logo: FunctionComponent<LogoProps> = ({ imgSrc, imgAlt, url }) => {
    return (
        <Link to={url} id="center-menu">
            <img src={imgSrc} alt={imgAlt}/>
        </Link>
    )
}

export default Logo;