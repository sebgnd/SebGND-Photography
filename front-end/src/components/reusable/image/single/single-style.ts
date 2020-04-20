import styled from 'styled-components';

export const SingleImageContainer = styled('button')`
    z-index: 0;
    max-height: 400px;
    min-height: 175px;
    max-width: 400px;
    min-width: 175px;
    overflow: hidden;
    margin: 10px;
    display: inline-block;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .25);
    transform: none;
    transition: transform .4s, box-shadow .4s;
    border: none;
    padding: 0;
    :hover {
        box-shadow: 0px 0px 20px rgba(0, 0, 0, .35);
        cursor: pointer;
        transform: scale(1.03);
    };
    :focus {
        outline: none;
    }
`

export const Img = styled('img')`
    width: 100%;
    height: 100%;
`