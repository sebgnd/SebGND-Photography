import React, { Component } from 'react';
import './button.css';

type ButtonProp = {
    onClick: () => void;
    name: string;
}

class Button extends Component<ButtonProp, {}> {
    constructor(props: ButtonProp) {
        super(props);
    }

    render() {
        return (
            <button className="classic-button" onClick={() => this.props.onClick()}>{this.props.name}</button>
        )
    }
}

export default Button;