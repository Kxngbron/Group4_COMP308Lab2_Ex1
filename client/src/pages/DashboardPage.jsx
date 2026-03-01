import React from "react";
import CoursePanel from "../components/CoursePanel.jsx";

export default function DashboardPage({ refreshKey }) {
  return (
    <div className="card">
      <h2>Course Actions</h2>
      <CoursePanel refreshKey={refreshKey} />
    </div>
  );
}