import React, { FunctionComponent } from 'react';
import styles from './Information.module.css';

interface InformationProps {
    name: string;
    value?: string | null;
}

const Information: FunctionComponent<InformationProps> = ({ name, value }) => {
    return (
        <div className={styles.informationContainer}>
            <div className={styles.information}>
                <div className={styles.informationItem}>
                    <p>{name}</p>
                </div>
                <div className={styles.informationItem}>
                    <p>{value ? value : 'No information.'}</p>
                </div>
            </div>
        </div>
    )
}

export default Information;