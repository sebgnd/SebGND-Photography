import styled, { css } from 'styled-components';

export const Text = styled('p')<{ size: string, color: string, weight: string }>`
    font-family: "CooperHewitt Medium";
    font-size: ${props => (props.size == 'small' ? .8 : 1)}em !important;
    margin: ${props => (props.size == 'small' ? 3 : 10)}px;
    color: ${props => props.color};
    font-weight: ${props => props.weight};
`

export const Title = styled('h1')<{ color: string }>`
    font-family: "CooperHewitt Medium";
    font-size: 2em;
    color: ${props => props.color};
`

export const SubTitle = styled('h2')<{ color: string }>`
    font-family: "CooperHewitt Medium";
    font-size: 1.4em;
    color: ${props => props.color};
`

export const FloatRight = styled('div')`
    float: right;
`

export const FloatLeft = styled('div')`
    float: left;
`

export const Relative = styled('div')`
    position: relative;
`

export const InlineBlock = styled('div')`
    display: inline-block;
`;

export const Block = styled('div')`
    display: block;
`;


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

export const ButtonContainer = styled('button')`
    text-decoration: none;
    border: none;
    padding: 0;
    background-color: transparent;
    :focus {
        outline: 0;
    }
    :hover {
        cursor: pointer;
    }
`

export const SizedContainer = styled('div')<{ height: number[], width: number[] }>`
    display: inline-block;
    max-height: ${props => props.height[1]}px;
    min-height: ${props => props.height[0]}px;
    max-width: ${props => props.width[1]}px;
    min-width: ${props => props.width[0]}px;
`

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

export const Flex = styled('div')<{ alignItems: string, justifyContent: string, wrap?: boolean }>`
    display: flex;
    align-items: ${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
    flex-wrap: ${props => props.wrap ? "wrap" : "nowrap"};
`;

export const FlexColumn = styled('div')`
    flex-direction: column;
`; 

export const FlexRow = styled('div')`
    flex-direction: row;
`;