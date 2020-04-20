import React, { Component } from 'react';
import RegularButton from './button-style';

type ButtonProp = {
    onClick: () => void;
    variant: string;
}

type ButtonState = {
    variant: string;
}

class Button extends Component<ButtonProp, ButtonState> {
    private readonly availableVariant: string[] = ['classic', 'light'];

    constructor(props: ButtonProp) {
        super(props);
        this.state = {
            variant: ''
        }
    }

    setVariant(variant: string) {
        if (this.availableVariant.includes(variant)) {
            this.setState({ variant });
        } else {
            this.setState({ variant: 'classic' })
        }
    }

    componentDidMount() {
        this.setVariant(this.props.variant);
    }

    render() {
        return (
            <RegularButton variant={this.state.variant} onClick={() => this.props.onClick()}>{this.props.children}</RegularButton>
        )
    }
}

export default Button;