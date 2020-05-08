import styled, { css } from 'styled-components';

export const Relative = styled('div')`
    position: relative;
`

export const ParallaxContainer = styled('div')<{ backgroundImage: string }>`
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    position: relative;
    background-image: url(${props => props.backgroundImage});
    height: 100%;
`