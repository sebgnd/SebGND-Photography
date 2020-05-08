import styled from 'styled-components';
import { GalleryButton } from '../../Button';

export const ButtonContainer = styled('div')`
    margin: 0 4vw;

    @media (max-width: 2000px) {
        max-width: 265px;
    }

    @media (max-width: 1200px) {
        max-width: 300px;
    }

    @media (max-width: 750px) {
        margin: 25px 4vw;
    }
`

export const ListContainer = styled('div')`
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    width: 80%;
    margin: auto;
`;