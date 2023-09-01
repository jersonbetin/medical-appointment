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

  type Patients {
    id: String!
    name: String!
    birthDate: String!
    gender: String!
  }

  input Coding {
    system: String!
    code: String!
    display: String!
  }

  input ObjectCoding {
    coding: [Coding]!
  }
  input Actor {
    reference: String!
  }

  input Participant {
    actor: Actor!
    status: String!
  }

  input ResourceData {
    resourceType: String!
    status: String!
    serviceType: [ObjectCoding]!
    start: String!
    end: String!
    participant: [Participant]!
  }

  input AppointmentInput {
    resourceType: String!
    resourceData: ResourceData!
  }

  type Query {
    login(username: String): User
    getDoctors: [Doctor]
    getPatients: [Patients]
    getAppointments(date: String): [Appointment]
  }

  type Mutation {
    createAppointment(input: AppointmentInput!): Appointment
  }
`;
