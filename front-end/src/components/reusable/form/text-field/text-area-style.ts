import styled, { css } from 'styled-components';

export const StyledTextArea = styled('textarea')<{ error: boolean }>`
    border: ${props => props.error ? '1px solid red' : 'none'};
    background-color: ${props => props.error ? 'rgb(255, 242, 242)' : 'white'};
    display: block;
    padding: 15px;
    height: 200px;
    resize: none;
    border-radius: 7px;
    transform: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.10);
    transition: box-shadow .5s, background-color .25s, border .25s;
    font-size: 0.8em;
    :hover {
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    }
    :focus {
        outline: 0;
    }
    ::placeholder {
        font-family: "CooperHewitt Medium";
    }
`