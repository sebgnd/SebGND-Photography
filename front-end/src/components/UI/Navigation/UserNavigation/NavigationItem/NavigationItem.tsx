import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationItem.module.css';

interface NavigationItemProps {
    name: string;
    url: string;
    onClick?: () => void;
}

const NavigationItem: FunctionComponent<NavigationItemProps> = ({ name, url, onClick }) => {
    return (
        <Link onClick={onClick} className={styles.navItem} to={url}>{name}</Link>
    )
}   

export default NavigationItem;
