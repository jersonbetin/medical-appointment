import { gql } from '@apollo/client';

const GET_PATIENTS = gql`
  query getPatients {
    getPatients {
      id
      name
      gender
      birthDate
    }
  }
`;

export { GET_PATIENTS };
