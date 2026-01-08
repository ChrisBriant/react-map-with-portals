import SignInSelector from "./SignInSelector";
import {Context as DataContext} from "../context/DataContext";
import {Context as AuthContext} from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { validateToken } from "../network/auth";

const Header = () => {
    const { setOverlayComponent, setShowOverlay} = useContext(DataContext);
    const { state:{signInStatus, profile}, setSignInStatus, setProfile} = useContext(AuthContext);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        //Check if signed in
         const validToken  =  validateToken();
         console.log("HEADER", validToken, signInStatus);
         if(validToken.valid) {
            console.log("TOKEN IS VALID");
            setSignInStatus(true);
            setSignedIn(true);
            setProfile(validToken);
         } else {
            setSignInStatus(false);
            setSignedIn(false);
            setProfile(null);
         }
         
    },[signInStatus]);

    const setSignInDisplay = () => {
        setOverlayComponent(<SignInSelector />);
        setShowOverlay(true);
    }

    return (
        <header>
            {
                !signedIn
                ?  <div className="signInBtn" onClick={() => setSignInDisplay()}>
                    Sign In
                </div>
                : <div className="profileBtn" onClick={() => setSignInDisplay()}>
                    {profile.username}
                </div>
            }

        </header>
    );
}

export default Header;