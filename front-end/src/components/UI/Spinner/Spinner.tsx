import React, { FunctionComponent, useState } from 'react';
import styles from './Spinner.module.css';

import withCentering, { CenteringProps } from '../../HOC/withCentering';

interface SpinnerProps {
    zIndex?: number;
    size?: 'normal' | 'small' | 'tiny';
}

const Spinner: FunctionComponent<SpinnerProps & CenteringProps> = ({ 
    zIndex,
    size = 'normal'
}) => {

    return (
        <div className={[styles.spinner, styles[size]].join(' ')} style={{ zIndex }} />
    )
}

export default withCentering(Spinner);