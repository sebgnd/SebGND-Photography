import styled, { css } from 'styled-components';

const ParallaxContainer = styled('div')<{ backgroundImage: string }>`
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position-y: 40px;
    position: relative;
    background-image: url(${props => props.backgroundImage});
`

export default ParallaxContainer;