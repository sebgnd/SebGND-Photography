import styled from 'styled-components';

export const ViewerImageWrapper = styled('div')`
    display: inline-block;
    margin: 10px;
`;

export const Img = styled('img')`
    max-height: 40vw;
    height: auto;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
`;

export const ViewerImageContainer = styled('div')`
    position: relative;
    margin-right: 25px;
    margin-bottom: 25px;
`; 

export const ImageInfo = styled('div')`
    background-color: white;
    padding: 5px 50px;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
`;