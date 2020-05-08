import React, { FunctionComponent } from 'react';
import styles from './RoundButton.module.css';

interface ArrowButtonProp {
    onClick: () => void;
}


const ArrowButton: FunctionComponent<ArrowButtonProp> = (props) => {
    return (
        <button className={styles.roundButton} onClick={props.onClick}>
            <div className={styles.iconContainer}>
                <div className={styles.icon}>
                    {props.children}
                </div>
            </div>
        </button>
    )
}

export default ArrowButton;