import React, { FunctionComponent, useEffect } from 'react';
import styles from './Landing.module.css';
import { Button } from '../../../UI/Button';

const Landing: FunctionComponent = () => {
    return (
        <div className={styles.landingContainer}>
            <div className={styles.landingButtonContainer}>
                <Button variant="classic" size="medium" label="See this photo" onClick={() => {}} />
            </div>
        </div>
    )
}

export default React.memo(Landing);