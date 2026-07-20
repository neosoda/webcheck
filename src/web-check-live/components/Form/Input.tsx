import { type InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import colors from 'web-check-live/styles/colors';
import { type InputSize, applySize } from 'web-check-live/styles/dimensions';

type Orientation = 'horizontal' | 'vertical';

interface Props {
  id: string,
  value: string,
  name?: string,
  label?: string,
  placeholder?: string,
  disabled?: boolean,
  size?: InputSize,
  orientation?: Orientation;
  handleChange: (nweVal: React.ChangeEvent<HTMLInputElement>) => void,
  handleKeyDown?: (keyEvent: React.KeyboardEvent<HTMLInputElement>) => void,
};

type SupportedElements = HTMLInputElement | HTMLLabelElement | HTMLDivElement;
interface StyledInputTypes extends InputHTMLAttributes<SupportedElements> {
  inputSize?: InputSize;
  orientation?: Orientation;
};

const InputContainer = styled.div<StyledInputTypes>`
  display: flex;
  ${props => props.orientation === 'vertical' ? 'flex-direction: column;' : ''};
`;

const StyledInput = styled.input<StyledInputTypes>`
  background: rgba(17, 24, 39, 0.85);
  color: ${colors.textColor};
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.5rem;
  font-family: inherit;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }

  ${props => applySize(props.inputSize)};
`;

const StyledLabel = styled.label<StyledInputTypes>`
  color: ${colors.textColor};
  ${props => applySize(props.inputSize)};
  padding: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Input = (inputProps: Props): JSX.Element => {

  const { id, value, label, placeholder, name, disabled, size, orientation, handleChange, handleKeyDown } = inputProps;

  return (
  <InputContainer orientation={orientation}>
    { label && <StyledLabel htmlFor={id} inputSize={size}>{ label }</StyledLabel> }
    <StyledInput
      id={id}
      value={value}
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      onChange={handleChange}
      inputSize={size}
      onKeyDown={handleKeyDown || (() => {})}
    />
  </InputContainer>
  );
};

export default Input;
