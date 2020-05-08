import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationItem.module.css';

interface NavigationItemProps {
    name: string;
    url: string;
}

const NavigationItem: FunctionComponent<NavigationItemProps> = ({ name, url }) => {
    return (
        <div className={styles.navItem}>
            <Link to={url}>{name}</Link>
        </div>
    )
}   

export default NavigationItem;
