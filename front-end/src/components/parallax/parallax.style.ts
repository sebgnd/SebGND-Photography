import styled, { css } from 'styled-components';

export const ParallaxContainer = styled('div')<{ backgroundImage: string }>`
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position-y: 40px;
    background-image: url(${props => props.backgroundImage});
    height: 100%;
    z-index: -500;
`