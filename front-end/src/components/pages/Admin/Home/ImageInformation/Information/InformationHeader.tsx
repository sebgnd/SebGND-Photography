import React, { FunctionComponent } from 'react';
import styles from './Information.module.css';

interface InformationHeaderProps {
    id: number;
    url: string;
}

const InformationHeader: FunctionComponent<InformationHeaderProps> = ({ url, id }) => {

    return (
        <div className={styles.informationContainer}>
            <div className={styles.information}>
                <div className={styles.informationItem}>
                    <img src={url} alt={id.toString()}/>
                </div>
                <div className={styles.informationItem}>
                    <p>{`Image ${id.toString()}`}</p>
                </div>
            </div>
        </div>
    )
};

export default InformationHeader;