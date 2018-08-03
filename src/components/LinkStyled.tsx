import styled from '../styled-components';
import { Link, LinkProps } from 'react-router-dom';

export const LinkStyled =
  styled(Link) <
  LinkProps >
  `
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;
