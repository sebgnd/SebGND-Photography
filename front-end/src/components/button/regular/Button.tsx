import React, { FunctionComponent } from 'react';
import StyledButton from './button-style';

interface ButtonProp {
    onClick: () => void;
    variant: string;
    size: string;
}

const VARIANTS = ['classic', 'light'];

const SIZES = ['medium', 'small', 'big'];

const Button: FunctionComponent<ButtonProp> = (props) => {
    const setVariant = (variant: string) => {
        return VARIANTS.includes(variant) ? variant : VARIANTS[0];
    }

    const setSize = (size: string) => {
        return SIZES.includes(size) ? size : SIZES[0];
    }

    const { variant, size, onClick } = props;
    return (
        <StyledButton size={setSize(size)} variant={setVariant(variant)} onClick={() => onClick()}>{props.children}</StyledButton>
    )
}

export default Button;