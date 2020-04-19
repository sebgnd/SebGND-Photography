import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './button.css';

type ButtonProp = {
    name: string;
    to: string;
}

class Button extends Component<ButtonProp, {}> {
    constructor(props: ButtonProp) {
        super(props);
    }

    render() {
        return (
            <Link to={this.props.to} className="classic-button">{this.props.name}</Link>
        )
    }
}

export default Button;