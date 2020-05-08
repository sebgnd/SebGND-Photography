import styled, { css } from 'styled-components';

const AdaptedImage = styled('img')<{ type: string }>`
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

export default AdaptedImage;