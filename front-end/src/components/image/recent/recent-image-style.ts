import styled, { css } from 'styled-components';
import { ButtonContainer } from '../../regular/container';

export const ButtonContainerWidthWidth = styled(ButtonContainer)<{ width: string }>`
    width: ${props => props.width};
`

export const RecentImageContainer = styled('div')`
    display: inline-block;
    position: relative;
    width: 850px;
    border-radius: 15px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, .10);
    margin: 10px;
    transform: none;
    transition: transform .35s, width .35s;
    :hover {
        transform: scale(1.01);
    }
    @media (max-width: 870px) {
        width: 95vw
    }
`;

export const Info = styled('div')`
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ImageContainer = styled('div')`
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 15px;
    text-align: center;
    padding: 0;
    overflow: hidden;
`;

export const FillerImage = styled('img')`
    position: relative;
    filter: blur(8px) brightness(85%);
    position: relative;
    bottom: -4px;
    max-height: 446px;
    width: 100%;
    height: 100%;
    left: 0;
`;

export const AdaptedImage = styled('img')<{ type: string }>`
    ${ props => props.type === 'landscape' && css`
        position: relative;
        border-radius: 15px;
        width: 100%;
        height: auto;
        bottom: -6px;
    `}
    ${ props => (props.type === 'portrait' || props.type !== 'landscape') && css`
        width: auto;
        height: 100%;
        position: absolute;
        max-height: 450px;
        left: 50%;
        top: 50%;
        margin-left: auto;
        margin-right: auto;
        transform: translateX(-50%) translateY(-50%);
    ` }
`;

export const InfoContainer = styled('div')`
    display: inline-block;
`

export const GalleryName = styled('div')`
    float: left;
    margin-left: 20px;
`

export const Date = styled('div')`
    float: right;
    margin-right: 20px;
`