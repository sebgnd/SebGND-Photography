import styled from 'styled-components';

export const ImageContainer = styled('div')`
    z-index: 0;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .25);
    transform: none;
    transition: transform .4s, box-shadow .4s;
    font-size: 0;
    :hover {
        box-shadow: 0px 0px 15px rgba(0, 0, 0, .25);
        transform: scale(1.01);
    };
`

export const SingleImageContainer = styled('div')`
    display: inline-block;
    min-height: 195px;
    max-height: 470px;
    min-width: 195px;
    max-width: 470px;
    margin: 10px;
`;

export const Img = styled('img')`
    width: 100%;
    height: 100%;
`

