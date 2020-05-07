import styled from 'styled-components';
import { GalleryButton } from '../Button';

export const GalleriesPreviewContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: white;
    width: 100%;
`;

export const Row = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;

export const TitleContainer = styled('div')`
    margin: 10px 0px;
    width: 100%;
    text-align: center;
`;

export const ButtonContainer = styled('div')`
    margin: 40px 0px;
`;