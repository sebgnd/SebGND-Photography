import React, { Component } from 'react';
import { RoundButton, Icon, IconContainer } from './round-button-style';

interface IArrowButtonProp {
    onClick: () => void;
}


class ArrowButton extends Component<IArrowButtonProp, {}> {
    render() {
        return (
            <RoundButton onClick={() => this.props.onClick()}>
                <IconContainer>
                    <Icon>
                        {this.props.children}
                    </Icon>
                </IconContainer>
            </RoundButton>
        )
    }
}

export default ArrowButton;