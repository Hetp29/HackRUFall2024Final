import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
        const response = await axios.post(`${API_BASE_URL}/register/`, {
            email: formData.get('email') as string,
            name: formData.get('name') as string,
            job_title: formData.get('job_title') as string,
            phone: formData.get('phone') as string,
            employees: formData.get('employees') as string,
            company_name: formData.get('company_name') as string,
            password: formData.get('password') as string,
        });
        console.log('User registered:', response.data);
    } catch (error) {
        console.error('Error during registration:', error);
    }
};

const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
        const response = await axios.post(`${API_BASE_URL}/login/`, {
            enail: formData.get('email') as string,
            password: formData.get('password') as string,
        });
        console.log('User logged in:', response.data);
    } catch(error) {
        console.error('Error during login:', error);
    }
};