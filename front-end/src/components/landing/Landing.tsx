import React, { FunctionComponent, useEffect } from 'react';
import styles from './Landing.module.css';
import { Button } from '../UI/Button';

const Landing: FunctionComponent = () => {
    return (
        <div className={styles.landingContainer}>
            <div className={styles.landingButtonContainer}>
                <Button variant="classic" size="medium" onClick={() => {}}>See this photo</Button>
            </div>
        </div>
    )
}

export default React.memo(Landing);