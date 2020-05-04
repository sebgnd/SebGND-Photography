import styled, { css } from 'styled-components';

const GalleryButtonWrapper = styled('div')`
    margin: 10px;
    display: inline-block;
`;

const GalleryButtonContainer = styled('div')`
    display: inline-block;
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
    ${GalleryButtonContainer}:hover & {
        transform: scale(1.05);
    }
`;

const Img = styled('img')`
    height: 100%;
    width: 100%;
`;

const GalleryNameContainer = styled('div')`
    display: inline-block;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    text-align: center;
    width: 100%;
    color: black;
    transform: none;
    transition: transform .5s, bottom .5s, box-shadow .5s;
    ${GalleryButtonContainer}:hover & {
        transform: scale(1.05);
    }
`;

const GalleryName = styled('p')`
    margin: 15px;
`;

export {
    GalleryButtonContainer,
    GalleryButtonWrapper,
    GalleryImage,
    Img,
    GalleryNameContainer,
    GalleryName
}