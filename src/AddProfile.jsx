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
import { useState, useEffect  } from "react";


function AddProfile(props) {

  const profilesCollectionRef = collection(db,"profiles")
  const [newfName, setNewfName] = useState("")
  const [newlName, setNewlName] = useState("")
  const [hasCompletedCourse1, setHasCompletedCourse1] = useState(false)
  const [hasCompletedCourse2, setHasCompletedCourse2] = useState(false)
  const [hasCompletedCourse3, setHasCompletedCourse3] = useState(false)
  const [hasCompletedCourse4, setHasCompletedCourse4] = useState(false)
  const [nextId, setNextId] = useState('');

  function reloadPage() {
    window.location.reload(false)
  }

  useEffect(() => {
  // Fetch the profiles to get the count
  const fetchProfiles = async () => {
    const querySnapshot = await getDocs(profilesCollectionRef);
    const count = querySnapshot.size + 1;

    // Generate the next ID
    const nextId = `#${count.toString().padStart(5, '0')}`;
    setNextId(nextId);
  };

  fetchProfiles();
}, [profilesCollectionRef]);

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
    badgeID:nextId
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
        <h2 className="card-title" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", margin: 0 }}>Add Profile</h2>
                  <br/>
          <br/>
          <br/>
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
          </div>
          <br/>
          <div style={{ marginRight: "10px" }}>
            <button className="btn btn-primary" onClick={handleClick}>Submit</button>
          </div>
          <br/>
          <br/>
          <br/>
        </div>
      </div>
    </div>
  );
}


export default AddProfile;
