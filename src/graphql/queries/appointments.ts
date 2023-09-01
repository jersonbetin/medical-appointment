import { gql } from '@apollo/client';

const GET_APPOINTMENTS = gql`
  query getAppointments($date: String) {
    getAppointments(date: $date) {
      id
      date {
        end
        start
      }
      doctorId
      patientId
      type
    }
  }
`;

export { GET_APPOINTMENTS };
