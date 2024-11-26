// StudentList.js
import '../Styles/StudentList.css'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const StudentList = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students for the specific course using courseId

    const fetchData = async () => {

      try {
        const response = await axios.get(`  /api/courses/${courseId}/students`);
  
        if (!response.data) {
          throw new Error('Network response was not ok');
        }
  
        setStudents(response.data);
      } catch (error) {
        // Handle error, e.g., log it or show a user-friendly message
        console.error('Error fetching students:', error);
      }

    }
    fetchData();
  }, [courseId]);

  return (
    <div>
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
          {students.map(student => (
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
