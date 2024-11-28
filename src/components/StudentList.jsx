import "../Styles/StudentList.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStudents } from "../utils/api";

const StudentList = () => {
  const { courseId } = useParams(); // Get courseId from URL params
  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch students data based on courseId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchStudents(courseId);

        if (!response.data) {
          throw new Error("Network response was not ok");
        }

        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, [courseId]);

  const goBackToCourses = async () => {
    navigate("/domain");
  };

  return (
    <div>
      {/* Cross button to close student list and go back */}
      <button className="close-btn" onClick={goBackToCourses}>
        &#10006; {/* HTML for cross symbol */}
      </button>

      {/* Navbar */}
      <div className="navbar">Student List</div>

      <h1>Students in Course {courseId}</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.rno}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
