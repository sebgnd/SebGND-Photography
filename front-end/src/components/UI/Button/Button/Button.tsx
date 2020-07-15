import React, { FunctionComponent, MouseEvent } from 'react';
import StyledButton from './button-style';

interface ButtonProp {
    onClick: (event: MouseEvent) => void;
    variant: string;
    size: string;
    label: string;
}

const VARIANTS = ['classic', 'light'];

const SIZES = ['medium', 'small', 'big'];

const Button: FunctionComponent<ButtonProp> = ({ variant, size, onClick, label }) => {
    const setVariant = (variant: string) => {
        return VARIANTS.includes(variant) ? variant : VARIANTS[0];
    }

    const setSize = (size: string) => {
        return SIZES.includes(size) ? size : SIZES[0];
    }

    return (
        <StyledButton size={setSize(size)} variant={setVariant(variant)} onClick={(event) => onClick(event)}>{label}</StyledButton>
    )
}

export default Button;