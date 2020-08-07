import styled, { css } from 'styled-components';

const ParallaxContainer = styled('div')<{ backgroundImage: string, opacity: number }>`
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position-y: 40px;
    position: relative;
    opacity: ${props => props.opacity};
    background-image: url(${props => props.backgroundImage});
    transition: opacity 0.5s linear
`

export default ParallaxContainer;