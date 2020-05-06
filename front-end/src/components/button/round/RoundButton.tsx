import React, { FunctionComponent } from 'react';
import { RoundButton, Icon, IconContainer } from './round-button-style';

interface ArrowButtonProp {
    onClick: () => void;
}


const ArrowButton: FunctionComponent<ArrowButtonProp> = (props) => {
    return (
        <RoundButton onClick={props.onClick}>
            <IconContainer>
                <Icon>
                    {props.children}
                </Icon>
            </IconContainer>
        </RoundButton>
    )
}

export default ArrowButton;