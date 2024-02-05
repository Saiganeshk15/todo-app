import { auth, db } from "../FirebaseConfig";
import { FaRegEdit, FaTrash, FaCheckCircle} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import { signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { set, ref, onValue, remove, update } from "firebase/database";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';

function HomePage() {

    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            // read
            onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
              setTodos([]);
              const data = snapshot.val();
              if (data !== null) {
                Object.values(data).map((todo) => {
                  setTodos((oldArray) => [...oldArray, todo]);
                });
              }
            });
          } else if (!user) {
            navigate("/");
          }
        });
      }, []);
    
      const handleSignOut = () => {
        signOut(auth)
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            alert(err.message);
          });
      };
    
      // add
      const writeToDatabase = (e) => {
        e.preventDefault();
        if (todo !== "") {
          const uidd = uid();
          set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
          todo: todo,
          uidd: uidd
        });
        }
        setTodo("");
      };
    
      // update
      const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
      };
    
      const handleEditConfirm = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
          todo: todo,
          uidd: tempUidd
        },{update: true});
    
        setTodo("");
        setIsEdit(false);
      };
    
      // delete
      const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
      };

      //mark as comlpete
      const handleComplete = (uid) => {
        document.getElementById(uid).style["text-decoration"] === "line-through" ?
        (document.getElementById(uid).style["text-decoration"] = "none") :
        (document.getElementById(uid).style["text-decoration"] = "line-through")
      }

    return (
      <>
        <div className='homepage'>
        {/* <div className='header'>
            <img src={auth.currentUser.photoURL} alt='Profile' />
            <p>{auth.currentUser.displayName}</p>
        </div> */}
        <form onSubmit={(e) => {writeToDatabase(e)}}>
        {isEdit ? (
        <div>
        <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon"/>
        </div>
      ) : (
        <div>
          <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
        </div>
      )}
        <input
        className="add-edit-input"
        type="text"
        placeholder="Add todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
        </form>
        <div className='todos'>
        {todos.map((todo) => (
        <div id={todo.uidd} key={todo.uidd} className="todo">
          <p>{todo.todo}</p>
          <div className='svgs'>
          <FaCheckCircle 
            onClick={(e) => handleComplete(todo.uidd)}
            className='competed-button'
          />
          <FaRegEdit
            onClick={() => handleUpdate(todo)}
            className="edit-button"
          />
          <FaTrash
            onClick={() => handleDelete(todo.uidd)}
            className="delete-button"
          />
          </div>
        </div>
      ))}
        </div>
        <LogoutIcon onClick={handleSignOut} className="logout-icon" />
        </div>
      </>
    )
}

export { HomePage}