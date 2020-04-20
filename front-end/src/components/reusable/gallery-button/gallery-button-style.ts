import styled, { css } from 'styled-components';

const GalleryButtonWrapper = styled('div')`
    margin: 10px;
    display: inline-block;
`;

const GalleryButtonContainer = styled('button')`
    max-width: 400px;
    min-width: 100px;
    position: relative;
    overflow: visible;
    margin-bottom: 25px;
    margin-right: 25px;
    border: none;
    background-color: transparent;
    :hover {
        cursor: pointer;
    }
    :focus {
        outline: none;
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
    position: absolute;
    right: -25px;
    bottom: -25px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    min-width: 75%;
    max-width: 95%;
    text-align: center;
    color: black;
    transform: none;
    transition: transform .5s, bottom .5s, box-shadow .5s;
    ${GalleryButtonContainer}:hover & {
        bottom: -40px;
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