import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      student {
        id
        studentNumber
        firstName
        lastName
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($studentNumber: String!, $password: String!) {
    login(studentNumber: $studentNumber, password: $password) {
      token
      student {
        id
        studentNumber
        firstName
        lastName
      }
    }
  }
`;

export const ADD_COURSE = gql`
  mutation AddCourse($input: CourseInput!) {
    addCourse(input: $input) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($courseId: ID!, $input: CourseUpdateInput!) {
    updateCourse(courseId: $courseId, input: $input) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation DeleteCourse($courseId: ID!) {
    deleteCourse(courseId: $courseId)
  }
`;

export const ENROLL = gql`
  mutation EnrollCourse($courseId: ID!) {
    enrollCourse(courseId: $courseId) {
      id
      studentNumber
      courses {
        id
        courseCode
        section
        semester
      }
    }
  }
`;

export const DROP = gql`
  mutation DropCourse($courseId: ID!) {
    dropCourse(courseId: $courseId) {
      id
      studentNumber
      courses {
        id
        courseCode
        section
        semester
      }
    }
  }
`;