import styled from 'styled-components';
import { GalleryButton } from '../../Button';

export const ButtonContainer = styled('div')`
    margin: 0 4vw;

    @media (max-width: 2000px) {
        margin: 0 2vw;
    }

    @media (max-width: 1000px) {
        margin: 0 10px;
    }

    @media (max-width: 850px) {
        max-width: 350px;
    }
`;

export const ListContainer = styled('div')`
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: auto;

    @media (max-width: 850px) {
        flex-direction: column;
    }
`;