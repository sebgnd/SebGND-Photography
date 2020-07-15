import React, { FunctionComponent, MouseEvent } from 'react';
import styles from './RoundButton.module.css';
import { StringNullableChain } from 'lodash';

interface ArrowButtonProp {
    onClick: (event: MouseEvent) => void;
    icon: string;
    disabled?: boolean;
}


const ArrowButton: FunctionComponent<ArrowButtonProp> = ({ onClick, icon, disabled = false }) => {
    return (
        <button disabled={disabled} className={styles.roundButton} onClick={(event) => onClick(event)}>
            <div className={styles.iconContainer}>
                <div className={styles.icon}>
                    <i className={`fas fa-${icon}`} />
                </div>
            </div>
        </button>
    )
}

export default ArrowButton;