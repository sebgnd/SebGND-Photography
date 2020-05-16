import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationItem.module.css';

interface NavigationItemProps {
    name: string;
    url: string;
}

const NavigationItem: FunctionComponent<NavigationItemProps> = ({ name, url }) => {
    return (
        <Link className={styles.navItem} to={url}>{name}</Link>
    )
}   

export default NavigationItem;
