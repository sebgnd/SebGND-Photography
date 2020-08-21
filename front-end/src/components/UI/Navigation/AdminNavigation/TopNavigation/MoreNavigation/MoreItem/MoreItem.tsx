import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './MoreItem.module.css';

interface MoreItemProps {
    name: string;
    url: string;
    onClick?: () => void;
}

const MoreItem: FunctionComponent<MoreItemProps> = ({ name, url, onClick }) => {
    return (
        <Link onClick={onClick} className={styles.moreItem} to={url}>{name}</Link>
    )
}

export default MoreItem