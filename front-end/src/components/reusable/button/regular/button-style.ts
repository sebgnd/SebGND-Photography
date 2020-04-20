import styled, { css } from 'styled-components';

type ButtonStyledProp = {
  variant: string;
}

const RegularButton = styled('button')<ButtonStyledProp>`
  display: inline-block;
  font-size: 1.1em;
  border: none;
  font-family: "CooperHewitt Medium";
  text-decoration: none;
  transform: none;
  padding: 15px  ${props => props.variant === 'light' ? 15 : 35 }px;
  height: 50px;
  width: auto;
  background-color: white;
  :focus {
    outline: 0;
  }
  :hover {
    cursor: pointer;
  }
  ${props => props.variant === 'light' ? 
  css`
    color: #858585;
    transition: color .25s;
    :hover {
      color: black;
    }
  ` : 
  css`
    color: black;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    transition: transform .5s;
    :hover {
      transform: scale(1.05);
    }
  `}
`;

export default RegularButton;