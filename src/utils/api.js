import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8090/api",
});

api.interceptors.request.use(
  (config) => {
    if (config.url !== "v1//auth/admin/login") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.jwt) {
        config.headers.Authorization = `Bearer ${user.jwt}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchDomains = () => 
    api.get("v1/domain");

export const fetchCourseByDomain = (domainId) =>
  api.get(`v1/byDomain/${domainId}`);

export const fetchStudents = (courseId) =>
  api.get(`courses/${courseId}/students`);

export const login = (loginData) =>
     api.post("/auth/admin/login", loginData);
