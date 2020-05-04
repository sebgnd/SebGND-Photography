import styled, { css } from 'styled-components';

export const InlineBlock = styled('div')`
    display: inline-block;
`;

export const Block = styled('div')`
    display: block;
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