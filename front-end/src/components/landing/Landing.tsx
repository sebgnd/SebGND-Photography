import React, { FunctionComponent } from 'react';
import Parallax from '../UI/Parallax/Parallax';
import styles from './Landing.module.css';
import { Button } from '../UI/Button';

const Landing: FunctionComponent = () => {
    return (
        <Parallax img="images/parallax-1.jpg" speed={0.5}>
            <div className={styles.landingContainer}>
                <div className={styles.landingButtonContainer}>
                    <Button variant="classic" size="medium" onClick={() => {}}>See this photo</Button>
                </div>
            </div>
        </Parallax>
    )
}

export default Landing;