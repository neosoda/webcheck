import styled from '@emotion/styled';

import { type ReactNode } from 'react';
import ErrorBoundary from 'web-check-live/components/misc/ErrorBoundary';
import Heading from 'web-check-live/components/Form/Heading';
import colors from 'web-check-live/styles/colors';

export const StyledCard = styled.section<{ styles?: string}>`
  background: rgba(17, 24, 39, 0.75);
  color: ${colors.textColor};
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 1.25rem;
  position: relative;
  margin: 0.5rem;
  max-height: 64rem;
  overflow: auto;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    border-color: rgba(59, 130, 246, 0.25);
  }
  ${props => props.styles}
`;

interface CardProps {
  children: ReactNode;
  heading?: string,
  styles?: string;
  actionButtons?: ReactNode | undefined;
};

export const Card = (props: CardProps): JSX.Element => {
  const { children, heading, styles, actionButtons } = props;
  return (
    <ErrorBoundary title={heading}>
      <StyledCard styles={styles}>
        { actionButtons && actionButtons }
        { heading && <Heading className="inner-heading" as="h3" align="left" color={colors.primary}>{heading}</Heading> }
        {children}
      </StyledCard>
    </ErrorBoundary>
  );
}

export default StyledCard;
