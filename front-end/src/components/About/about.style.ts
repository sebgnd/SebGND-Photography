import styled from 'styled-components';

export const AboutContainer = styled('div')`
    height: auto;
    box-sizing: content-box;
`

export const TitleContainer = styled('div')`
    width: 100%;
    text-align: center;
    padding: 20px 0px;
`

export const MainContent = styled('div')`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
    width: 100%;
    padding-bottom: 65px;
`

export const TextContainer = styled('div')`
    font-size: 1.15em;
    vertical-align: top;
    height: auto;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
    display: inline-block;
    margin: 0 4vw;
    text-align: left;
    padding: 50px;
    line-height: 2.3em;
    letter-spacing: 1px;

    @media (max-width: 1500px) {
        margin: 0 1vw;
    }

    @media (max-width: 1000px) {
        margin: 25px auto;
    }
`;

export const AboutMe = styled(TextContainer)`
    width: 35%;

    @media (max-width: 1500px) {
        width: 45%;
    }

    @media (max-width: 1000px) {
        width: 65%;
    }
`;

export const ContactButtonContainer = styled('div')`
    margin: auto;
    text-align: center;
`

export const Gear = styled(TextContainer)`
    width: 20%;

    @media (max-width: 1500px) {
        width: 30%;
    }

    @media (max-width: 1000px) {
        width: 65%;
    }
`;