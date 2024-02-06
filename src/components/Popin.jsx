import React from 'react';
import { auth } from "../FirebaseConfig";
import { signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { useEffect } from 'react';
import logo from "./google.png";
import { useNavigate } from 'react-router-dom';

function Popin(){

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            navigate("/todo-app/Homepage");
          }
        });
      },[]);

    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const handleSignIn = (auth,provider) => {
        signInWithPopup(auth,provider)
        .then((result) => {
            navigate("/todo-app/Homepage")
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    return (
      <div className='login'>
            <button onClick={(e) => {handleSignIn(auth,provider)}}
             className='signin'>
                <img src={logo} alt='Google' /> Sign in with Google
            </button>
      </div>
    )
}
export default Popin