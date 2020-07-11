import React, { FunctionComponent } from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
    center: boolean;
}

const Spinner: FunctionComponent<SpinnerProps> = ({ center }) => {
    return (
        <>
            {center ? (
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinner} />
                </div>
            ) : (
                <div className={styles.spinner} />
            )}
        </>
    )
}

export default Spinner;