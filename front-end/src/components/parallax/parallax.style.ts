import styled, { css } from 'styled-components';

export const ParallaxContainer = styled('div')<{ backgroundImage: string, top: number }>`
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-image: url(${props => props.backgroundImage});
    height: 100%;
`