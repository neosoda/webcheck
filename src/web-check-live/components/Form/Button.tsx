import { type ReactNode, type MouseEventHandler } from 'react';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import colors from 'web-check-live/styles/colors';
import { type InputSize, applySize } from 'web-check-live/styles/dimensions';

type LoadState = 'loading' | 'success' | 'error';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: InputSize,
  bgColor?: string,
  fgColor?: string,
  styles?: string,
  title?: string,
  type?: 'button' | 'submit' | 'reset' | undefined,
  loadState?: LoadState,
};

const StyledButton = styled.button<ButtonProps>`
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  font-family: inherit;
  font-weight: 600;
  box-sizing: border-box; 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
    opacity: 0.95;
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  }
  ${props => applySize(props.size)};
  ${(props) => props.bgColor ?
    `background: ${props.bgColor};` : `background: linear-gradient(135deg, ${colors.primary} 0%, #1d4ed8 100%);`
  }
  ${(props) => props.fgColor ?
    `color: ${props.fgColor};` : `color: #ffffff;`
  }
  ${props => props.styles}
`;


const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const SimpleLoader = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid ${colors.background};
  width: 1rem;
  height: 1rem;
  animation: ${spinAnimation} 1s linear infinite;
`;

const Loader = (props: { loadState: LoadState }) => {
  if (props.loadState === 'loading') return <SimpleLoader />
  if (props.loadState === 'success') return <span>✔</span>
  if (props.loadState === 'error') return <span>✗</span>
  return <span></span>;
};

const Button = (props: ButtonProps): JSX.Element => {
  const { children, size, bgColor, fgColor, onClick, styles, title, loadState, type } = props;
  return (
    <StyledButton
      onClick={onClick || (() => null) }
      size={size}
      bgColor={bgColor}
      fgColor={fgColor}
      styles={styles}
      title={title?.toString()}
      type={type || 'button'}
      >
      { loadState && <Loader loadState={loadState} /> }
      {children}
    </StyledButton>
  );
};

export default Button;
