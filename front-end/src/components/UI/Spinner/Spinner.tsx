import React, { FunctionComponent } from 'react';
import styles from './Spinner.module.css';

import withCentering, { WithCenteringProps } from '../../HOC/withCentering';

interface SpinnerProps {
    zIndex?: number;
}

const Spinner: FunctionComponent<SpinnerProps & WithCenteringProps> = ({ 
    centerHorizontal = false,
    centerVertical = false,
    zIndex,
    centeringClass
}) => {

    return (
        <>
            {(centerHorizontal || centerVertical) ? (
                <div className={[styles.spinnerContainer, centeringClass].join(' ')} style={{ zIndex }}>
                    <div className={styles.spinner} />
                </div>
            ) : (
                <div className={styles.spinner} style={{ zIndex }} />
            )}
        </>
    )
}

export default withCentering(Spinner);