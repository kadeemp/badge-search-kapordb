import React from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from './firebase.js'
import { v4 } from "uuid";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Login(props) {

  const navigate = useNavigate();
  let isAuthenticated = localStorage.getItem(`authenticated`)
  const [loginEmail, setLoginEmail] = useState("1");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  //   if (currentUser != null) {
  //     localStorage.setItem(`authenticated`, "true")
  //     console.log(currentUser.email);
  //   }
  //
  // });
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setTimeout(navigate("/admin-dashboard"), 4000)
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
  await signOut(auth);
  localStorage.setItem(`authenticated`, "false")
console.log("logged out");
  setTimeout(navigate("/"), 6000)

};

  function reloadPage() {
    window.location.reload(false)
  }

function handleClick(event) {
  var user = auth.currentUser;

  console.log(user);

}


  return (
<div>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <div className="card" style={{margin:"auto", width:"50%"}}>

    <h5 className="card-title" style={{paddingTop:"20px", paddingLeft:"20px"}}>Login</h5>
    <div className="card-body" style={{textAlign: "center"}}>
      <div style={{paddingBottom: "5px"}} >
          <input className="form-control" id="username" placeholder="Username" type="text" onChange={(event) => {setLoginEmail(event.target.value)}}/>
      </div>
      <div style={{paddingBottom: "20px"}}>
          <input className="form-control" id="password" placeholder="Password" type="text" onChange={(event) => {setLoginPassword(event.target.value)}}/>
      </div>

      <div style={{marginRight: "10px"}}>
      {/*  */}
        <button className="btn btn-primary" onClick={login} >Login</button>
        <button className="btn btn-danger" onClick={logout} >Logout</button>

      </div>
    </div>
  </div>
  <br/>
  <br/>
  <br/>
  <br/>

  <br/>
</div>
  );
}


export default Login;
