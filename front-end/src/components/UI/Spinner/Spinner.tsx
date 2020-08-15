import React, { FunctionComponent, useState } from 'react';
import styles from './Spinner.module.css';

import withCentering, { WithCenteringProps } from '../../HOC/withCentering';

interface SpinnerProps {
    zIndex?: number;
    size?: 'normal' | 'small';
}

const Spinner: FunctionComponent<SpinnerProps & WithCenteringProps> = ({ 
    centerHorizontal = false,
    centerVertical = false,
    zIndex,
    centeringClass,
    size = 'normal'
}) => {

    return (
        <>
            {(centerHorizontal || centerVertical) ? (
                <div className={[styles.spinnerContainer, centeringClass].join(' ')} style={{ zIndex }}>
                    <div className={[styles.spinner, styles[size]].join(' ')} />
                </div>
            ) : (
                <div className={[styles.spinner, styles[size]].join(' ')} style={{ zIndex }} />
            )}
        </>
    )
}

export default withCentering(Spinner);