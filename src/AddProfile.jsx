import React from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { db } from './firebase.js'
import { v4 } from "uuid";
import { storage } from "./firebase";
import { useState } from "react";


function AddProfile(props) {

  const profilesCollectionRef = collection(db,"profiles")
  const [newfName, setNewfName] = useState("")
  const [newlName, setNewlName] = useState("")
  const [hasCompletedCourse1, setHasCompletedCourse1] = useState(false)
  const [hasCompletedCourse2, setHasCompletedCourse2] = useState(false)
  const [hasCompletedCourse3, setHasCompletedCourse3] = useState(false)
  const [hasCompletedCourse4, setHasCompletedCourse4] = useState(false)

  function reloadPage() {
    window.location.reload(false)
  }

function test() {

  console.log(hasCompletedCourse1,hasCompletedCourse2,hasCompletedCourse3,hasCompletedCourse4);

}


function handleClick(event) {
  event.preventDefault();
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${month}-${day}-${year}`;

  // Generate a UUID as the profile ID
  let profileID = v4();

  // Add the document to the "profiles" collection
  addDoc(collection(db, "profiles"), {
    profileID: profileID,
    dateAdded: currentDate,
    fname: newfName,
    lname: newlName,
    c1Complete: hasCompletedCourse1,
    c2Complete: hasCompletedCourse2,
    c3Complete: hasCompletedCourse3,
    c4Complete: hasCompletedCourse4,
  }).then(() => {
    // Successfully added document
    console.log("Profile added successfully");
  }).catch((error) => {
    // Handle error
    console.error("Error adding profile:", error);
  });
}
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="card" style={{ margin: "auto", width: "50%" }}>
        <h2 className="card-title" style={{ paddingTop: "20px", paddingLeft: "20px" }}>Add Profile</h2>
        <div className="card-body" style={{ textAlign: "center" }}>
          <div style={{ paddingBottom: "5px", paddingTop: "10px", justifyContent: "space-around" }}>
            <input
              className="form-control"
              id="fname"
              placeholder="First Name"
              type="text"
              style={{ marginRight: "20px" }}
              onChange={(event) => {
                setNewfName(event.target.value);
              }}
            />
            <input
              className="form-control"
              id="lname"
              placeholder="Last Name"
              type="text"
              onChange={(event) => {
                setNewlName(event.target.value);
              }}
            />
          </div>
          <div style={{ paddingBottom: "10px", paddingTop: "10px", display: "flex", justifyContent: "space-around" }}>
            <div>
              <h4>Course 1</h4>
              <input
                className="form-control"
                id="course1Status"
                type="checkbox"
                checked={hasCompletedCourse1}
                onChange={(event) => {
                  setHasCompletedCourse1(event.target.checked);
                }}
              />
            </div>
            <div>
              <h4>Course 2</h4>
              <input
                className="form-control"
                id="course2Status"
                type="checkbox"
                checked={hasCompletedCourse2}
                onChange={(event) => {
                  setHasCompletedCourse2(event.target.checked);
                }}
              />
            </div>
            <div>
              <h4>Course 3</h4>
              <input
                className="form-control"
                id="course3Status"
                type="checkbox"
                checked={hasCompletedCourse3}
                onChange={(event) => {
                  setHasCompletedCourse3(event.target.checked);
                }}
              />
            </div>
            <div>
              <h4>Course 4</h4>
              <input
                className="form-control"
                id="course4Status"
                type="checkbox"
                checked={hasCompletedCourse4}
                onChange={(event) => {
                  setHasCompletedCourse4(event.target.checked);
                }}
              />
            </div>
          </div>
          <div style={{ marginRight: "10px" }}>
            <button className="btn btn-primary" onClick={handleClick}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AddProfile;
