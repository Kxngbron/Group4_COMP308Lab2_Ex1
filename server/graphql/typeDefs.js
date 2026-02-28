export const typeDefs = `#graphql
  type Student {
    id: ID!
    studentNumber: String!
    firstName: String!
    lastName: String!
    address: String!
    city: String!
    phoneNumber: String!
    email: String!
    program: String!
    courses: [Course!]!
  }

  type Course {
    id: ID!
    courseCode: String!
    courseName: String!
    section: String!
    semester: String!
  }

  type AuthPayload {
    token: String!
    student: Student!
  }

  input SignupInput {
    studentNumber: String!
    password: String!
    firstName: String!
    lastName: String!
    address: String!
    city: String!
    phoneNumber: String!
    email: String!
    program: String!
  }

  input CourseInput {
    courseCode: String!
    courseName: String!
    section: String!
    semester: String!
  }

  input CourseUpdateInput {
    courseCode: String
    courseName: String
    section: String
    semester: String
  }

  type Query {
    students: [Student!]!
    courses: [Course!]!
    myCourses: [Course!]!
    studentsByCourse(courseId: ID!): [Student!]!
    me: Student
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    login(studentNumber: String!, password: String!): AuthPayload!

    addCourse(input: CourseInput!): Course!
    updateCourse(courseId: ID!, input: CourseUpdateInput!): Course!
    deleteCourse(courseId: ID!): Boolean!

    enrollCourse(courseId: ID!): Student!
    dropCourse(courseId: ID!): Student!
  }
`;