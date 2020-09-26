import React, { FunctionComponent, MouseEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './Button.module.css';

interface ButtonProp {
    onClick?: (event: MouseEvent) => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'classic' | 'light';
    size?: 'medium' | 'small' | 'big';
    disabled?: boolean;
    label: string;
    color?: string;
    to?: string;
    fullWidth?: boolean;
}

const Button: FunctionComponent<ButtonProp & RouteComponentProps> = ({ 
    variant = 'classic', 
    size = 'medium', 
    label, 
    type, 
    history, 
    to,
    color = 'white',
    fullWidth,
    disabled,
    onClick, 
}) => {
    const handleClick = (event: MouseEvent) => {
        if (onClick) onClick(event);
        if (to) history.push(to);
    }

    const getClassName = () => {
        const classes = [styles.button, styles[size], styles[variant]];
        if (fullWidth) {
            classes.push(styles.fullWidth);
        }
        return classes.join(' ');
    }

    return (
        <button 
            disabled={disabled}
            className={getClassName()}
            onClick={(event) => handleClick(event)}
            type={type}
            style={{
                backgroundColor: color
            }}
        >
            {label}
        </button>
    )
}

export default withRouter(Button);