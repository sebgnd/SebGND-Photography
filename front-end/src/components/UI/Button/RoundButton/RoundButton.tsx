import React, { FunctionComponent, MouseEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './RoundButton.module.css';

interface ArrowButtonProp {
    onClick?: (event: MouseEvent) => void;
    icon: string;
    disabled?: boolean;
    isBranding?: boolean;
    to?: string;
}


const ArrowButton: FunctionComponent<ArrowButtonProp & RouteComponentProps> = ({ onClick, icon, disabled = false, isBranding = false, to, history }) => {
    const handleClick = (event: MouseEvent) => {
        if (onClick) {
            onClick(event);
        }
        if (to) {
            history.push(to);
        }
    }
    return (
        <button disabled={disabled} className={styles.roundButton} onClick={(event) => handleClick(event)}>
            <div className={styles.iconContainer}>
                <div className={styles.icon}>
                    <i className={`${isBranding ? 'fab' : 'fas'} fa-${icon}`} />
                </div>
            </div>
        </button>
    )
}

export default withRouter(ArrowButton);