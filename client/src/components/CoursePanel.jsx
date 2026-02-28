import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_COURSES, MY_COURSES } from "../graphql/queries.js";
import { ADD_COURSE, UPDATE_COURSE, DELETE_COURSE, ENROLL, DROP } from "../graphql/mutations.js";

export default function CoursePanel({ refreshKey }) {
  const [courseInput, setCourseInput] = useState({
    courseCode: "",
    courseName: "",
    section: "",
    semester: ""
  });

  const [updateData, setUpdateData] = useState({ courseId: "", section: "" });
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [msg, setMsg] = useState("");

  const { data: coursesData, refetch: refetchCourses } = useQuery(GET_COURSES);
  const { data: myData, refetch: refetchMy } = useQuery(MY_COURSES);

  const [addCourse] = useMutation(ADD_COURSE, {
    onCompleted: async () => {
      setMsg("✅ Course added");
      await refetchCourses();
    },
    onError: (e) => setMsg(`❌ ${e.message}`)
  });

  const [updateCourse] = useMutation(UPDATE_COURSE, {
    onCompleted: async () => {
      setMsg("✅ Course updated");
      await refetchCourses();
      await refetchMy();
    },
    onError: (e) => setMsg(`❌ ${e.message}`)
  });

  const [deleteCourse] = useMutation(DELETE_COURSE, {
    onCompleted: async () => {
      setMsg("✅ Course deleted");
      await refetchCourses();
      await refetchMy();
    },
    onError: (e) => setMsg(`❌ ${e.message}`)
  });

  const [enroll] = useMutation(ENROLL, {
    onCompleted: async () => {
      setMsg("✅ Enrolled");
      await refetchMy();
    },
    onError: (e) => setMsg(`❌ ${e.message}`)
  });

  const [drop] = useMutation(DROP, {
    onCompleted: async () => {
      setMsg("✅ Dropped course");
      await refetchMy();
    },
    onError: (e) => setMsg(`❌ ${e.message}`)
  });

  // refresh when auth changes
  React.useEffect(() => {
    refetchCourses();
    refetchMy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const courses = coursesData?.courses ?? [];
  const myCourses = myData?.myCourses ?? [];

  return (
    <div className="stack">
      <div className="section">
        <h3>Add Course</h3>
        {["courseCode", "courseName", "section", "semester"].map((k) => (
          <input
            key={k}
            className="input"
            placeholder={k}
            value={courseInput[k]}
            onChange={(e) => setCourseInput({ ...courseInput, [k]: e.target.value })}
          />
        ))}
        <button className="btn primary" onClick={() => addCourse({ variables: { input: courseInput } })}>
          Add Course
        </button>
      </div>

      <div className="section">
        <h3>Update Course Section</h3>
        <select className="input" value={updateData.courseId} onChange={(e) => setUpdateData({ ...updateData, courseId: e.target.value })}>
          <option value="">Select a course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.courseCode} - {c.section} ({c.semester})
            </option>
          ))}
        </select>
        <input
          className="input"
          placeholder="New section (ex: 002)"
          value={updateData.section}
          onChange={(e) => setUpdateData({ ...updateData, section: e.target.value })}
        />
        <button
          className="btn"
          onClick={() =>
            updateCourse({ variables: { courseId: updateData.courseId, input: { section: updateData.section } } })
          }
        >
          Update
        </button>
      </div>

      <div className="section">
        <h3>Enroll / Drop</h3>
        <select className="input" value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
          <option value="">Select a course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.courseCode} - {c.courseName} ({c.section})
            </option>
          ))}
        </select>

        <div className="row">
          <button className="btn primary" onClick={() => enroll({ variables: { courseId: selectedCourseId } })}>
            Enroll
          </button>
          <button className="btn" onClick={() => drop({ variables: { courseId: selectedCourseId } })}>
            Drop
          </button>
          <button className="btn danger" onClick={() => deleteCourse({ variables: { courseId: selectedCourseId } })}>
            Delete Course
          </button>
        </div>

        <div className="small">
          <b>My Courses:</b> {myCourses.length ? myCourses.map((c) => c.courseCode).join(", ") : "None"}
        </div>
      </div>

      {msg && <div className="msg">{msg}</div>}
    </div>
  );
}