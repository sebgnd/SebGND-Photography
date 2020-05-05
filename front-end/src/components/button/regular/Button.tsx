import React, { Component } from 'react';
import StyledButton from './button-style';

interface IButtonProp {
    onClick: () => void;
    variant: string;
    size: string;
}

const VARIANTS = ['classic', 'light'];

const SIZES = ['medium', 'small', 'big'];

class Button extends Component<IButtonProp, {}> {
    setVariant(variant: string) {
        return VARIANTS.includes(variant) ? variant : VARIANTS[0];
    }

    setSize(size: string) {
        return SIZES.includes(size) ? size : SIZES[0];
    }

    render() {
        const { variant, size, onClick } = this.props;
        return (
            <StyledButton size={this.setSize(size)} variant={this.setVariant(variant)} onClick={() => onClick()}>{this.props.children}</StyledButton>
        )
    }
}

export default Button;