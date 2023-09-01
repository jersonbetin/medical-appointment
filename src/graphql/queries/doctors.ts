import { gql } from '@apollo/client';

const GET_DOCTORS = gql`
  query getDoctors {
    getDoctors {
      id
      resourceType
      name
      gender
      address {
        city
        country
        line
        postalCode
        state
      }
    }
  }
`;

export { GET_DOCTORS };
