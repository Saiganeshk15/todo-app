import React from 'react';
import { auth } from "../FirebaseConfig";
import { signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Popin(){

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            navigate("/Homepage");
          }
        });
      },[]);

    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const handleSignIn = (auth,provider) => {
        signInWithPopup(auth,provider)
        .then((result) => {
            navigate("/Homepage")
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    return (
      <div className='login'>
            <button onClick={(e) => {handleSignIn(auth,provider)}}
             className='signin'>
                <img src="google.png" alt="Google" /> Sign in with Google
            </button>
      </div>
    )
}
export default Popin