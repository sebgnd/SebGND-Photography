import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminLogo.module.css';

interface AdminLogoProps {
    imgUrl: string;
    textUrl: string;
    imgSrc: string;
    imgAlt: string;
    text: string;
}

const AdminLogo: FunctionComponent<AdminLogoProps> = ({ imgUrl, textUrl, imgSrc, imgAlt, text }) => {
    return (
        <div className={styles.adminLogo}>
            <Link to={imgUrl}>
                <img src={imgSrc} alt={imgAlt} />
            </Link> 
            <Link to={textUrl}>
                <h5 style={{ margin: '0' }}>{text}</h5>
            </Link>
        </div>
    )
}

export default AdminLogo;