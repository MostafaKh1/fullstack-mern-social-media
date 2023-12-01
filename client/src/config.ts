const developmentApiUrl = 'http://localhost:5000';
const deploymentApiUrl = 'https://fullstack-mern-social-media-backend.onrender.com';


const isDevelopment = false;

export const apiUrl = isDevelopment ? developmentApiUrl : deploymentApiUrl;



