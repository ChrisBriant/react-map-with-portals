import { getToken } from '../network/auth';
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { validateToken } from '../network/auth';
import LoadingWidget from '../components/LoadingWidget';
import { Context as AuthContext } from '../context/AuthContext';


const queryParams = new URLSearchParams(window.location.search);

const Auth = () => {
  const [networkError, setNetworkError] = useState(false);
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const alias = localStorage.getItem("neuropunkAlias");
  const idp = localStorage.getItem("idp");
  const { state: {signInStatus}, setSignInStatus,setProfile} = useContext(AuthContext);

  useEffect(() => {
    const authCode = queryParams.get("code");
    console.log("AUTH CODE", authCode)
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const idp = pathSegments[pathSegments.length -1 ];
    console.log("IDP", idp);
    let signInUrl = null; 
    switch (idp) {
      case "authdiscord":
        signInUrl = "signindiscord";
        break;
      case "authgoogle":
        signInUrl = "signingoogle";
      default:
        signInUrl = null;
        break;
    }

    console.log("WHY?", authCode, !networkError, !setSignInStatus, signInUrl);

    if(authCode && !networkError && !signInStatus && signInUrl) {
      console.log("SIGNING IN");
      
      getToken(authCode, signInUrl).then(token => {
        localStorage.setItem("portalTokenData",JSON.stringify(token));
        const tokenData = validateToken();
        if(tokenData.valid) {
          setProfile(tokenData);
          setSignInStatus(true);
          console.log("I SHOULD NAVIGATE");
          window.location.href = "/";
          //navigate('/');
        }
        //Get the redirect
        // const signinRedirect = localStorage.getItem('neuroSigninRedirect');
        // localStorage.removeItem('neuroSigninRedirect');
        // window.location.href = signinRedirect;
        //navigate('/');
      }).catch( err => {
          console.error("Error occured fetching the token", err.status);
        if(err.status === 404) {
          setError("Your user account was not found. If signing in for the first time, you need to add an alias.");
        }
        setNetworkError(true);
      });
    }
  });
  
  return (
    <div>
      {
        networkError
        ? <div className='panel network-error'>
            <h1>Unable to sign in. Please try again later.</h1>
            <h2 className="error">{error}</h2>
            <button className='btn type-4 btn-width' onClick={() => navigate("/")}>Back to Homepage</button>
          </div>
        : <LoadingWidget message="Authenticating..." /> 
      }
      
    </div>
  )
}

export default Auth;