import styled, { css } from 'styled-components';

const RoundButton = styled('button')`
    height: 55px;
    width: 55px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
    display: inline-block;
    font-size: 2em;
    transform: none;
    border: none;
    transition: .25s transform;
    :hover {
        transform: scale(1.05);
        cursor: pointer;
    };
    :focus {
        outline: none;
    }
`;

const IconContainer = styled('div')`
    display: inline-block;
    height: 100%;
    width: 100%;
`;

const Icon = styled('div')`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export {
    RoundButton,
    IconContainer,
    Icon
}
