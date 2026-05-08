import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Automatically token add karo har request mein
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Auth APIs
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Student APIs
export const getStudents = () => API.get('/students');
export const addStudent = (data) => API.post('/students', data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

// Teacher APIs
export const getTeachers = () => API.get('/teachers');
export const addTeacher = (data) => API.post('/teachers', data);
export const deleteTeacher = (id) => API.delete(`/teachers/${id}`);

export default API;