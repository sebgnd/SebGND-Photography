import React, { Component } from 'react';

class ParallaxContent extends Component {
    shouldComponentUpdate() {
        return false;
    }
    
    render() {
        return (
            this.props.children
        )
    }
}

export default ParallaxContent;