import styled, { css } from 'styled-components';

const getSize = (size: string): number => {
    switch (size) {
        case 'small': return .8;
        case 'medium': return 1;
        case 'big': return 1.1;
        default: return 1;
    }
}

export const Text = styled('p')<{ size: string, weight: string, color?: string, }>`
    font-family: "CooperHewitt Medium";
    font-size: ${props => getSize(props.size)}em !important;
    margin: ${props => (props.size == 'small' ? 3 : 10)}px;
    color: ${props => props.color ? props.color : 'black'};
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