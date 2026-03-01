import React from "react";
import ListsPanel from "../components/ListsPanel.jsx";

export default function ListsPage({ refreshKey }) {
  return (
    <div className="card full">
      <h2>Lists</h2>
      <ListsPanel refreshKey={refreshKey} />
    </div>
  );
}