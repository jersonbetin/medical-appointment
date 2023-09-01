import { gql } from 'apollo-server-core';

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment($input: AppointmentInput!) {
    createAppointment(input: $input) {
      id
      date {
        start
        end
      }
      doctorId
      patientId
      type
    }
  }
`;
