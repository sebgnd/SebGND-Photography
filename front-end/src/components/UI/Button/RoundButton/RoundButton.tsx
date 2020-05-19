import React, { FunctionComponent } from 'react';
import styles from './RoundButton.module.css';
import { StringNullableChain } from 'lodash';

interface ArrowButtonProp {
    onClick: () => void;
    fontAwesomeClass: string;
}


const ArrowButton: FunctionComponent<ArrowButtonProp> = ({ onClick, fontAwesomeClass }) => {
    return (
        <button className={styles.roundButton} onClick={onClick}>
            <div className={styles.iconContainer}>
                <div className={styles.icon}>
                    <i className={fontAwesomeClass} />
                </div>
            </div>
        </button>
    )
}

export default ArrowButton;