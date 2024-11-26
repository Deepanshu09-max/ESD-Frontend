import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/domain.css";
import axios from "axios";

const DomainList = () => {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of domains when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8090/api/v1/domain");
        console.log("This is the data I am looking for", response.data);

        setDomains(response.data);
      } catch (error) {
        console.error("Error fetching domains:", error);
        // Handle errors here if needed
      }
    };
    fetchData();
  }, []);

  const handleDomainChange = async (event) => {
    const domainId = event.target.value;
    // console.log(event.target);
    console.log("asdfghj");
    console.log(domainId);
    setSelectedDomain(domainId);

    try {
      const response = await axios.get(
        `http://localhost:8090/api/v1/byDomain/${domainId}`
      );
      const data = response.data;
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <div>
      <h1>ACADEMIA</h1>
      <div class="center-container ">
        <label htmlFor="domainDropdown">Select a Domain: </label>
        <select id="domainDropdown" onChange={(e) => handleDomainChange(e)}>
          <option value="">Select a domain</option>
          {domains.map((domain) => (
            <option key={domain.id} value={domain.id}>
              {domain.program}
            </option>
          ))}
        </select>
      </div>

      {selectedDomain && (
        <div>
          <h2>COURSE TIME TABLE</h2>
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Faculty Name</th>
                <th>Faculty Email</th>
                <th>Day</th>
                <th>Time</th>
                <th>Room</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.faculty && course.faculty.f_name}</td>
                  <td>{course.faculty && course.faculty.f_email}</td>
                  <td>{course.schedule && course.schedule.day}</td>
                  <td>{course.schedule && course.schedule.time}</td>
                  <td>{course.schedule && course.schedule.room}</td>
                  <td>
                    <button>
                      <Link to={`/courses/${course.id}/students`}>
                        View Students
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DomainList;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Typography,
// } from "@mui/material";
// import "../Styles/domain.css";
// import axios from "axios";

// const DomainList = () => {
//   const [domains, setDomains] = useState([]);
//   const [selectedDomain, setSelectedDomain] = useState(null);
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     // Fetch the list of domains when the component mounts
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("api/v1/domain");
//         setDomains(response.data);
//       } catch (error) {
//         console.error("Error fetching domains:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleDomainChange = async (event) => {
//     const domainId = event.target.value;
//     setSelectedDomain(domainId);
//     console.log(domainId);

//     try {
//       console.log(`Fetching courses for domain:${domainId}`);
//       const response = await axios.get(
//         `http://localhost:8090/api/v1/byDomain/${domainId}`
//       );
//       const data = response.data;
//       console.log("Courses fetched successfully:", response.data);
//       setCourses(data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };

//   //   const handleDomainChange = async (event) => {
//   //     const domainId = event.target.value;
//   //     setSelectedDomain(domainId);

//   //     try {
//   //       const response = await axios.get(`api/v1/byDomain/${domainId}`);
//   //       const data = response.data;
//   //       setCourses(data);
//   //     } catch (error) {
//   //       console.error("Error fetching courses:", error);
//   //     }
//   //   };

//   return (
//     <div className="domain-list-container">
//       <Typography variant="h3" align="center" gutterBottom>
//         Academia Course Dashboard
//       </Typography>

//       <div className="center-container">
//         <FormControl fullWidth variant="outlined" sx={{ mb: 4 }}>
//           <InputLabel id="domain-label">Select a Domain</InputLabel>
//           <Select
//             labelId="domain-label"
//             id="domainDropdown"
//             value={selectedDomain || ""}
//             onChange={(e)=>handleDomainChange(e)}
//             label="Select a Domain"
//           >
//             <MenuItem value="">
//               <em>Select a domain</em>
//             </MenuItem>
//             {domains.map((domain) => (
//               <MenuItem key={domain.id} value={domain.id}>
//                 {domain.program}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </div>

//       {selectedDomain && (
//         <div className="course-table">
//           <Typography variant="h4" align="center" gutterBottom>
//             Course Timetable
//           </Typography>
//           <table>
//             <thead>
//               <tr>
//                 <th>Course ID</th>
//                 <th>Course Name</th>
//                 <th>Faculty Name</th>
//                 <th>Faculty Email</th>
//                 <th>Day</th>
//                 <th>Time</th>
//                 <th>Room</th>
//                 <th>View Students</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courses.map((course) => (
//                 <tr key={course.id}>
//                   <td>{course.id}</td>
//                   <td>{course.name}</td>
//                   <td>{course.faculty && course.faculty.f_name}</td>
//                   <td>{course.faculty && course.faculty.f_email}</td>
//                   <td>{course.schedule && course.schedule.day}</td>
//                   <td>{course.schedule && course.schedule.time}</td>
//                   <td>{course.schedule && course.schedule.room}</td>
//                   <td>
//                     <Button variant="contained" color="primary" size="small">
//                       <Link
//                         to={`/courses/${course.id}/students`}
//                         style={{ textDecoration: "none", color: "white" }}
//                       >
//                         View Students
//                       </Link>
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DomainList;
