import React from "react"
import {
  collection,
  getDocs,
  updateDoc,
  writeBatch
} from "firebase/firestore";
import { db, auth } from './firebase.js'
import { useState, useEffect } from "react";
import  { signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";

// import {NotificationContainer, NotificationManager} from 'react-notifications';



function AdminDashboard() {
  const Nav = useNavigate();

    function checkIfAuthenticated() {

      const authenticated = localStorage.getItem("authenticated")
      console.log(`auth is ${authenticated}`);
      if (authenticated == "true") {
        console.log("authenticated");
      } else {
        console.log("not authenticated");
        document.getElementById("container").remove()
        setTimeout(Nav("/"), 6000)

        }
    }

    // function createNotification(type) {
    //   switch (type) {
    //         case 'info':
    //           NotificationManager.info('Info message');
    //           break;
    //         case 'success':
    //           NotificationManager.success('Success message', 'Title here');
    //           break;
    //         case 'warning':
    //           NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
    //           break;
    //         case 'error':
    //           NotificationManager.error('Unauthorized Access', 'Please login to access this area', 5000);
    //           break;
    //         }
    // }

    function start() {

    checkIfAuthenticated()

    }
function goToAllCertificates() {
  Nav("/all-certificates")
}
function goToAllProfiles() {
  Nav("/all-profiles")
}

function goToAddProfile() {
  Nav("/add-profile")

}

function generatePassword() {
  return Math.random().toString().slice(2, 7);
}

async function updateProfilesWithPassword() {
  const batch = writeBatch(db); // Initialize a write batch
  const profilesCollectionRef = collection(db, "profiles");

  try {
    const snapshot = await getDocs(profilesCollectionRef);
    snapshot.docs.forEach((doc) => {
      const password = generatePassword(); // Generate a unique 5-digit password for each document
      const docRef = doc.ref; // Get a reference to the document
      batch.update(docRef, { password: password }); // Add this document to the batch update
    });

    await batch.commit(); // Commit the batch update
    console.log('All profiles have been updated with a new password.');
  } catch (error) {
    console.error("Error updating profiles:", error);
  }
}

async function logout() {
  await signOut(auth);
  localStorage.setItem(`authenticated`, "false")
console.log("logged out");
  setTimeout(Nav("/"), 6000)
}
  useEffect(() => { start() },[])

  return (
    <div id="container">
      <h1>Admin Dashboard</h1>  <br/>
        <br/>


      <button className="btn btn-primary" style={{textAlign: "center"}} onClick={goToAllCertificates} style={{paddingBottom: "10px", paddingTop: "10px"}}>All Certificates</button>

      <button className="btn btn-primary" style={{textAlign: "center"}} onClick={goToAllProfiles} style={{paddingBottom: "10px", paddingTop: "10px"}}>All Profiles</button>

      <button className="btn btn-primary" style={{textAlign: "center"}} onClick={goToAddProfile} style={{paddingBottom: "10px", paddingTop: "10px"}}>Add Profile</button>

      <button className="btn btn-primary" style={{textAlign: "center"}} onClick={logout} style={{paddingBottom: "10px", paddingTop: "10px"}}>Logout</button>

      <button className="btn btn-primary" style={{textAlign: "center"}} onClick={updateProfilesWithPassword} style={{paddingBottom: "10px", paddingTop: "10px"}}>Update Profiles</button>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

    </div>
  );
}

export default AdminDashboard;
