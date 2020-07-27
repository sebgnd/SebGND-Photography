import React, { FunctionComponent, MouseEvent } from 'react';
import styles from './RoundButton.module.css';

interface ArrowButtonProp {
    onClick: (event: MouseEvent) => void;
    icon: string;
    disabled?: boolean;
    isBranding?: boolean;
}


const ArrowButton: FunctionComponent<ArrowButtonProp> = ({ onClick, icon, disabled = false, isBranding = false }) => {
    return (
        <button disabled={disabled} className={styles.roundButton} onClick={(event) => onClick(event)}>
            <div className={styles.iconContainer}>
                <div className={styles.icon}>
                    <i className={`${isBranding ? 'fab' : 'fas'} fa-${icon}`} />
                </div>
            </div>
        </button>
    )
}

export default ArrowButton;