const developmentApiUrl = 'http://localhost:5000';
const deploymentApiUrl = 'https://mern-social-media-app-mft8.onrender.com';


const isDevelopment = false;

export const apiUrl = isDevelopment ? developmentApiUrl : deploymentApiUrl;



