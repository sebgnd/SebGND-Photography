import styled, { css } from 'styled-components';

export const FloatRight = styled('div')`
    float: right;
`

export const FloatLeft = styled('div')`
    float: left;
`

export const Relative = styled('div')`
    position: relative;
`

export const MarginLeft = styled('div')<{ amount: number }>`
    margin-left: ${props => props.amount}px;
`

export const MarginRight = styled('div')<{ amount: number }>`
    margin-right: ${props => props.amount}px;
`

export const MarginBottom = styled('div')<{ amount: number }>`
    margin-bottom: ${props => props.amount}px;
`

export const MarginTop = styled('div')<{ amount: number }>`
    margin-top: ${props => props.amount}px;
`

export const MarginSides = styled('div')<{ amount: number}>`
    margin-left: ${props => props.amount};
    margin-right: ${props => props.amount};
`

export const Margin = styled('div')<{ amount: number }>`
    margin: ${props => props.amount}px;
`

export const MarginAuto = styled('div')`
    margin: auto;
`;

export const Absolute = styled('div')<{ top?: number, bottom?: number, left?: number, right?: number }>`
    position: absolute;
    ${props => props.top && css`
        top: ${props.top}px;
    `}
    ${props => props.bottom && css`
        bottom: ${props.bottom}px;
    `}
    ${props => props.left && css`
        left: ${props.left}px;
    `}
    ${props => props.right && css`
        right: ${props.right}px;
    `}
`

export const AbsoluteWithWidth = styled('div')<{ top?: number, bottom?: number, left?: number, right?: number, min: number, max: number }>`
    position: absolute;
    max-width: ${props => props.max}%;
    min-width: ${props => props.min}%;
    transition: all .5s;

    ${props => props.top && css`
        top: ${props.top}px;
    `}
    ${props => props.bottom && css`
        bottom: ${props.bottom}px;
    `}
    ${props => props.left && css`
        left: ${props.left}px;
    `}
    ${props => props.right && css`
        right: ${props.right}px;
    `}
`