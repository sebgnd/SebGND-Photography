import styled, { css } from 'styled-components';

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

export const FlexContainer = styled('div')<{ alignItems: string, justifyContent: string, wrap?: boolean }>`
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

export const TextContainer = styled('div')`
    height: auto;
    width: auto;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
    display: inline-block;
    text-align: left;
    padding: 50px;
    line-height: 2.3em;
    letter-spacing: 1px;
    background-color: rgba(255, 255, 255, 0.95);
    margin: 10px;
`