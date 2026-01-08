import GoogleBtn from "../assets/GoogleSignIn.png";
import DiscordBtn from "../assets/Discord-Logo-White.png";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context as DataContext } from "../context/DataContext";

const SignInSelector = () => {
    const navigate = useNavigate();
    const { setShowOverlay } = useContext(DataContext);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleDiscordSignIn = () => {

        if(acceptTerms) {
            //Do sign in
            const authUrl = "https://discord.com/oauth2/authorize?client_id=1457609526445342793&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauthdiscord&scope=identify"

            setShowOverlay(false);
            navigate(authUrl);
        } else {
            setErrorMessage("Please accept the terms and conditions.");
        }

    }

    const handleGoogleSignIn = () => {
        if(acceptTerms) {
            //Do sign in
            setErrorMessage("");
        } else {
            setErrorMessage("Please accept the terms and conditions.");
        }
        console.log("TERMS", acceptTerms);
        
    }

    return (
        <div className="signInSelector panel">
            <h2>Sign In</h2>
            <div className="signInOptions">
                {/* <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=210218847741-7bsqeoctvh6fksuf7d0dr41vqisvmemp.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5500%2Fcallback.html&scope=profile&response_type=code">
                    <div className="btn google signInBtn">
                        <img src={GoogleBtn} alt="Google Sign In" />
                    </div>
                </a>
                <a href="https://discord.com/oauth2/authorize?client_id=1448723408924704780&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5500%2Fcallback-discord.html&scope=identify">
                    <div className="btn discord signInBtn">
                        <img src={DiscordBtn} alt="Discord Sign In" />
                    </div>
                </a> */}
                <div className="errorBox">
                    <p>{errorMessage}</p>
                </div>
                <button className="btn google signInBtn" onClick={() => handleGoogleSignIn() }>
                    <img src={GoogleBtn} alt="Google Sign In" />
                </button>

                <button className="btn discord signInBtn" onClick={() => handleDiscordSignIn() }>
                    <img src={DiscordBtn} alt="Discord Sign In" />
                </button>
                
                <p><input id="acceptTerms" type="checkbox" onChange={(evt) => setAcceptTerms(evt.currentTarget.checked) } /> I accept the <a href="#">terms and conditions</a>.</p>
            </div>
        </div>
    );
}

export default SignInSelector;