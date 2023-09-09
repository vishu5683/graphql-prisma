import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  type User {
    _id: ID
    name: String
    email: String
    password: String
  }
`;

export default typeDefs;
