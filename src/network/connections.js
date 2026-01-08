import axios from 'axios';

//Get the BASE URL
const getBaseURL = (environment) => {
  switch (environment) {
    case 'DEV':
      return process.env.REACT_APP_BASE_URL_DEV;
    case 'TEST':
      return process.env.REACT_APP_BASE_URL_TEST;
    case 'PROD':
      return process.env.REACT_APP_BASE_URL_PROD;
    default:
      return process.env.REACT_APP_BASE_URL_DEV;
  }
}


const conn = axios.create({
    baseURL : process.env.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const connWithAuth =(token) => axios.create({
  baseURL : process.env.API_BASE_URL,
  headers: {
      'accept': 'application/json',
      'token': `Bearer ${token}`
  }
});

// const connWithApiKey = axios.create({
//   baseURL : getBaseURL(process.env.REACT_APP_ENVIRONMENT),
//   headers : {
//     "Content-Type": "application/json",
//     "X-API-Key": process.env.REACT_APP_NEUROPUNK_API_KEY
//   }

// });

export {conn, connWithAuth};