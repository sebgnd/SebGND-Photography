import styled, { css } from 'styled-components';

const getFontSize = (size: string): number => {
  switch (size) {
    case 'small': return .8;
    case 'medium': return 1;
    case 'big': return 1.2;
    default: return .8;
  }
}

const StyledButton = styled('button')<{ variant: string, size: string }>`
  display: inline-block;
  border: none;
  font-family: "CooperHewitt Medium";
  text-decoration: none;
  transform: none;
  width: auto;
  background-color: white;
  margin: 5px;

  font-size: ${props => getFontSize(props.size)}em;
  font-weight: ${props => props.variant === 'light' ? 'bold' : 'normal'};
  padding: ${props => props.variant === 'light' ? '5px' : '15px 35px'};
  min-height: ${props => props.variant === 'light' ? 'auto' : '50px'};
  height: auto;

  :focus {
    outline: 0;
  }

  :hover {
    cursor: pointer;
    ${props => props.variant === 'light' ? css`
      color: black;
    ` : css`
      transform: scale(1.05);
    `}
  }

  ${props => props.variant === 'light' ? 
  css`
    color: #7E7E7E;
    transition: color .25s;
  ` : 
  css`
    color: black;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    transition: transform .5s;
  `}
`;

export default StyledButton;