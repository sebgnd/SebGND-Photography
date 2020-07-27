import React, { FunctionComponent, MouseEvent } from 'react';
import StyledButton from './button-style';

interface ButtonProp {
    onClick?: (event: MouseEvent) => void;
    type?: "button" | "submit" | "reset" | undefined;
    variant: string;
    size: string;
    label: string;
}

const VARIANTS = ['classic', 'light'];

const SIZES = ['medium', 'small', 'big'];

const Button: FunctionComponent<ButtonProp> = ({ variant, size, onClick, label, type }) => {
    const setVariant = (variant: string) => {
        return VARIANTS.includes(variant) ? variant : VARIANTS[0];
    }

    const setSize = (size: string) => {
        return SIZES.includes(size) ? size : SIZES[0];
    }

    return (
        <StyledButton 
            type={type}
            size={setSize(size)} 
            variant={setVariant(variant)} 
            onClick={onClick}
        >
            {label}
        </StyledButton>
    )
}

export default Button;