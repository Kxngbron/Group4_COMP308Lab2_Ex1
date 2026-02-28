import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

export const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      studentNumber
      firstName
      lastName
      email
      program
      courses {
        id
        courseCode
        section
        semester
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      studentNumber
      firstName
      lastName
      email
      program
      courses {
        id
        courseCode
        courseName
        section
        semester
      }
    }
  }
`;

export const MY_COURSES = gql`
  query MyCourses {
    myCourses {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

export const STUDENTS_BY_COURSE = gql`
  query StudentsByCourse($courseId: ID!) {
    studentsByCourse(courseId: $courseId) {
      id
      studentNumber
      firstName
      lastName
      email
      program
    }
  }
`;