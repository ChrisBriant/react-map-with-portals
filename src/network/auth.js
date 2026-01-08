import {conn} from './connections';


const getTokenFromLocalStorage = () => {
  const tokenData = localStorage.getItem("portalTokenData");
  const tokenPair = JSON.parse(tokenData);
  return tokenPair;
}


const getToken = async (code, tokenEndpoint) => {
  const url = `/${tokenEndpoint}`;
  console.log("URL IS ", url);
  return new Promise((resolve,reject) => {
    conn.post(url,{ 
      code
    })
    .then( (response) => {
      return resolve(response.data);
    }).catch((err) => {
      console.error("ERROR",err);
      return reject(err);
    });
  });
}

function getTokenData(token) {
  try {
      // Split the JWT into parts
      const parts = token.split('.');
      if (parts.length !== 3) {
          throw new Error('Invalid token format');
      }

      // Decode the payload
      const payload = JSON.parse(atob(parts[1])); // Decode the base64Url-encoded payload
      if (!payload.exp) {
          throw new Error('Token does not have an expiration time');
      }

      // Get the current time in seconds
      const currentTime = Math.floor(Date.now() / 1000);

      // Compare the expiration time with the current time
      return {
        valid : currentTime < payload.exp,
        username : payload.alias,
        userId : payload.user_id
      };
      
  } catch (error) {
      console.error('Error checking token expiration:', error.message);
      return {
        valid : false,
        username : "",
        userId : ""
      };
  }
}

const validateToken = () => {
  const token = getTokenFromLocalStorage();
  if(!token) {
    return {
      valid : false,
      username : "",
      userId : ""
    };
  } else {
    //Perform validation
    const tokenData = getTokenData(token.access_token);
    return tokenData;
  }
}

export {getTokenFromLocalStorage, getToken, validateToken};