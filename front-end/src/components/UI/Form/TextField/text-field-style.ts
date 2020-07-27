import styled, { css } from 'styled-components';

export const StyledTextArea = styled('textarea')<{ error: boolean }>`
    border: ${props => props.error ? '1px solid red' : 'none'};
    background-color: ${props => props.error ? 'rgb(255, 242, 242)' : 'white'};
    display: block;
    padding: 15px;
    height: 230px;
    resize: none;
    border-radius: 7px;
    transform: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.10);
    transition: box-shadow .5s, background-color .25s, border .25s;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8em;
    width: 100%;
    box-sizing: border-box;
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

export const StyledInput = styled('input')<{ error: boolean }>`
    border: ${props => props.error ? '1px solid red' : 'none'};
    background-color: ${props => props.error ? 'rgb(255, 242, 242)' : 'white'};
    display: block;
    padding: 15px;
    height: 50px;
    border-radius: 7px;
    transform: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.10);
    transition: box-shadow .5s, background-color .25s, border .25s;
    font-size: 0.8em;
    width: 100%;
    box-sizing: border-box;
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

export const TextFieldContainer = styled('div')`
    display: block;
    margin: 50px;
`

export const LabelContainer = styled('div')`
    margin-bottom: 10px;
    margin-left: 5px;
`

export const ErrorContainer = styled('p')`
    color: red;
    font-size: 0.75em;
    margin-top: 0;
    margin-bottom: 10px;
    margin-left: 5px;
`

export const LabelErrorContainer = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
`