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