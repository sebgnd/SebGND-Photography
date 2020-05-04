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