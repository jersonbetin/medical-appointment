import { gql } from '@apollo/client';

const LOGIN_AUTH = gql`
  query login($username: String) {
    login(username: $username) {
      token
    }
  }
`;

export { LOGIN_AUTH };
