import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    token: String!
  }

  type Address {
    city: String!
    country: String!
    line: [String]
    postalCode: String!
    state: String!
  }

  type Doctor {
    id: String!
    resourceType: String!
    name: String!
    gender: String!
    address: [Address]
  }

  type RangeDate {
    start: String
    end: String
  }

  type Appointment {
    id: String
    date: RangeDate
    doctorId: String!
    patientId: String!
    type: String
  }

  type Query {
    login(username: String): User
    getDoctors: [Doctor]
    getAppointments(date: String): [Appointment]
  }
`;
