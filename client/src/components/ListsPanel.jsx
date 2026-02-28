import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_COURSES, GET_STUDENTS, STUDENTS_BY_COURSE } from "../graphql/queries.js";

export default function ListsPanel({ refreshKey }) {
  const [courseId, setCourseId] = useState("");

  const { data: coursesData, refetch: refetchCourses } = useQuery(GET_COURSES);
  const { data: studentsData, refetch: refetchStudents } = useQuery(GET_STUDENTS);

  const { data: sbcData, refetch: refetchSBC } = useQuery(STUDENTS_BY_COURSE, {
    variables: { courseId },
    skip: !courseId
  });

  React.useEffect(() => {
    refetchCourses();
    refetchStudents();
    if (courseId) refetchSBC();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const courses = coursesData?.courses ?? [];
  const students = studentsData?.students ?? [];
  const studentsByCourse = sbcData?.studentsByCourse ?? [];

  return (
    <div className="stack">
      <div className="section">
        <h3>All Courses</h3>
        <div className="list">
          {courses.map((c) => (
            <div key={c.id} className="list-item">
              <div>
                <b>{c.courseCode}</b> — {c.courseName}
              </div>
              <div className="muted">
                Section: {c.section} | Semester: {c.semester}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>All Students</h3>
        <div className="list">
          {students.map((s) => (
            <div key={s.id} className="list-item">
              <div>
                <b>{s.firstName} {s.lastName}</b> ({s.studentNumber})
              </div>
              <div className="muted">
                {s.email} | {s.program} | Courses: {s.courses?.length ?? 0}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Students Taking a Given Course</h3>
        <select className="input" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
          <option value="">Select course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.courseCode} ({c.section})
            </option>
          ))}
        </select>

        {courseId && (
          <div className="list">
            {studentsByCourse.map((s) => (
              <div key={s.id} className="list-item">
                <div>
                  <b>{s.firstName} {s.lastName}</b> ({s.studentNumber})
                </div>
                <div className="muted">{s.email} | {s.program}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}