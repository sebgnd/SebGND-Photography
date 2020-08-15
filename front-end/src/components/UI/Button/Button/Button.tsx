import React, { FunctionComponent, MouseEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import StyledButton from './button-style';

interface ButtonProp {
    onClick?: (event: MouseEvent) => void;
    type?: "button" | "submit" | "reset" | undefined;
    variant: string;
    size: string;
    label: string;
    to?: string;
}

const VARIANTS = ['classic', 'light'];

const SIZES = ['medium', 'small', 'big'];

const Button: FunctionComponent<ButtonProp & RouteComponentProps> = ({ variant, size, onClick, label, type, history, to }) => {
    const setVariant = (variant: string) => {
        return VARIANTS.includes(variant) ? variant : VARIANTS[0];
    }

    const setSize = (size: string) => {
        return SIZES.includes(size) ? size : SIZES[0];
    }

    const handleClick = (event: MouseEvent) => {
        if (onClick) {
            onClick(event);
        }
        if (to) {
            history.push(to);
        }
    }

    return (
        <StyledButton 
            type={type}
            size={setSize(size)} 
            variant={setVariant(variant)} 
            onClick={(event) => handleClick(event)}
        >
            {label}
        </StyledButton>
    )
}

export default withRouter(Button);