import React, { FunctionComponent, MouseEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './RoundButton.module.css';

interface RoundButtonProp {
    onClick?: (event: MouseEvent) => void;
    size?: 'small' | 'medium';
    icon?: string;
    label?: string;
    disabled?: boolean;
    isBranding?: boolean;
    to?: string;
    hoverStyle?: 'scale' | 'bgColor';
    active?: boolean;
}


const RoundButton: FunctionComponent<RoundButtonProp & RouteComponentProps> = ({ 
    onClick, 
    icon, 
    disabled = false, 
    isBranding = false, 
    to, 
    history,  
    label,
    size = 'medium',
    hoverStyle = 'scale',
    active
}) => {
    const handleClick = (event: MouseEvent) => {
        if (onClick) {
            onClick(event);
        }
        if (to) {
            history.push(to);
        }
    }

    const getClassName = () => {
        const classes = [styles.roundButton, styles[size], styles[hoverStyle]];
        if (active) {
            classes.push(styles.active);
        }
        return classes.join(' ');
    }
    return (
        <button 
            disabled={disabled} 
            className={getClassName()} 
            onClick={(event) => handleClick(event)}
        >
            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    {(!label && icon) && (
                        <i className={`${isBranding ? 'fab' : 'fas'} fa-${icon}`} />
                    )}
                    {(!icon && label) && (
                        <p>{label}</p>
                    )}
                </div>
            </div>
        </button>
    )
}

export default withRouter(RoundButton);