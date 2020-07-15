import React, { FunctionComponent } from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
    centerHorizontal?: boolean;
    centerVertical?: boolean;
    zIndex?: number;
}

const Spinner: FunctionComponent<SpinnerProps> = ({ centerHorizontal = false, centerVertical = false, zIndex }) => {
    const getClassNames = () => {
        const classes = [styles.spinnerContainer];
        if (centerHorizontal) {
            classes.push(styles.spinnerCenterHorizontal);
        }
        if (centerVertical) {
            classes.push(styles.spinnerCenterVertical);
        }
        return classes.join(' ');
    }
    return (
        <>
            {(centerHorizontal || centerVertical) ? (
                <div className={getClassNames()} style={{ zIndex }}>
                    <div className={styles.spinner} />
                </div>
            ) : (
                <div className={styles.spinner} style={{ zIndex }} />
            )}
        </>
    )
}

export default Spinner;