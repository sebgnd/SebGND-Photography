import styled, { css } from 'styled-components';

const GalleryButtonContainer = styled('div')`
    margin: 10px;
    display: inline-block;
`;

const GalleryButtonWrapper = styled('div')` /////////
    display: inline-block;
    margin: 25px;

    max-height: 400px;
    min-height: 100px;
    max-width: 400px;
    min-width: 100px;
    position: relative;

    :hover #gallery-name {
        bottom: -35px;
    }
`;

const GalleryImage = styled('div')`
    height: 100%;
    width: 100%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    display: flex;
    transform: none;
    transition: transform .5s, box-shadow .5s;
    ${GalleryButtonWrapper}:hover & {
        transform: scale(1.05);
    }
`;

const Img = styled('img')`
    height: 100%;
    width: 100%;
`;

const GalleryName = styled('div')`
    display: inline-block;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    text-align: center;
    width: 100%;
    color: black;
    
    position: absolute;
    right: -25px;
    bottom: -25px;
    min-width: 75%;
    max-width: 95px;

    transform: none;
    transition: transform .5s, bottom .5s, box-shadow .5s;
    ${GalleryButtonWrapper}:hover & {
        transform: scale(1.05);
    }
`;

export {
    GalleryButtonContainer,
    GalleryButtonWrapper,
    GalleryImage,
    Img,
    GalleryName
}