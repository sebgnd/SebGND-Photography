import React, { Component } from 'react';

interface IInfoDisplayProps {
    info: string;
    position: string;
    maxWidth?: number;
    minWidth?: number;
}

interface IPosition {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}

const POSITIONS: string[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

/* TODO:
    - Position -> top-left, top-right, ...
    - Info -> what is being displayed
    - max/minWidth -> if it has a size (Absolute / AbsoluteWidthSize)
    - 
*/

class InfoDisplay extends Component<IInfoDisplayProps, {}> {
    getPosition() {
        let { position } = this.props;
        let positionValues: IPosition;
        
        // Get absolute position
    }
    render() {
        return (
            null
        )
    }
}

export default InfoDisplay;