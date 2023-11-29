import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, getDocs, where, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase.js';
import ProfileCard from './ProfileCard';  // Assuming the file path is correct
import { Link } from 'react-router-dom';

function EditProfile() {
  const [newfName, setNewfName] = useState('');
  const [newlName, setNewlName] = useState('');
  const [c1Complete, setC1Complete] = useState(false);
  const [c2Complete, setC2Complete] = useState(false);
  const [c3Complete, setC3Complete] = useState(false);
  const [profileData, setProfileData] = useState({
    id: '',
    date: '',
  });
  const { id } = useParams();
  const [documentId, setDocumentId] = useState(''); // State to store the document ID


  function checkIfAuthenticated() {
    const authenticated = localStorage.getItem('authenticated');
    console.log(`auth is ${authenticated}`);
    if (authenticated !== 'true') {
      console.log('not authenticated');
      // Redirect logic or show an error message
    }
  }

  async function fetchData() {
    checkIfAuthenticated();
    const q = query(collection(db, 'profiles'), where('profileID', '==', `${id}`));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const fetchedData = querySnapshot.docs[0].data();
      setProfileData(fetchedData);

      // Separate state variables for individual elements
      setNewfName(fetchedData.fname || '');
      setNewlName(fetchedData.lname || '');
      setC1Complete(fetchedData.c1Complete || false);
      setC2Complete(fetchedData.c2Complete || false);
      setC3Complete(fetchedData.c3Complete || false);
      setDocumentId(querySnapshot.docs[0].id); // Set the document ID

    }
  }

  async function save() {
      // Assuming the 'profiles' collection is used
      const profileRef = doc(db, 'profiles', documentId);

      try {
        // Update the document in Firestore with the current state
        await updateDoc(profileRef, {
          fname: newfName,
          lname: newlName,
          c1Complete: c1Complete,
          c2Complete: c2Complete,
          c3Complete: c3Complete,
          // Add other fields as needed
        });

        console.log('Document successfully updated!');
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }

  useEffect(() => {
    fetchData();
  }, []);  // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      <div className="card" style={{ margin: 'auto', width: '50%', marginBottom: '20px' }}>
        <h5 className="card-title" style={{ paddingTop: '20px', paddingLeft: '20px' }}>Profile Card</h5>
        <div className="card-body" style={{ textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ padding: '10px' }}>
            <h2>{newfName}</h2>
            <input
              className="form-control"
              id="fname"
              placeholder="First Name"
              type="text"
              value={newfName}
              onChange={(event) => setNewfName(event.target.value)}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <h2>{newlName}</h2>
            <input
              className="form-control"
              id="lname"
              placeholder="Last Name"
              type="text"
              value={newlName}
              onChange={(event) => setNewlName(event.target.value)}
            />
          </div>
        </div>

          <div>
            {/* Inline Checkboxes */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'center' }}>
                <h3>Course 1</h3>
                <input
                  type="checkbox"
                  id="course1"
                  name="course1"
                  checked={c1Complete}
                  onChange={() => setC1Complete(!c1Complete)}
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3>Course 2</h3>
                <input
                  type="checkbox"
                  id="course2"
                  name="course2"
                  checked={c2Complete}
                  onChange={() => setC2Complete(!c2Complete)}
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3>Course 3</h3>
                <input
                  type="checkbox"
                  id="course3"
                  name="course3"
                  checked={c3Complete}
                  onChange={() => setC3Complete(!c3Complete)}
                />
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <div>
            <button className="btn btn-primary" style={{ textAlign: 'center' }} onClick={save} >Save</button>
          </div>
        </div>
      </div>

      {/* Display the ProfileCard using the fetched data */}
      <ProfileCard
        fname={profileData.fname}
        lname={profileData.lname}
        id={profileData.id}
        date={profileData.date}
        c1Complete={c1Complete}
        c2Complete={c2Complete}
        c3Complete={c3Complete}
        c4Complete={profileData.c4Complete}
      />

      <br/>
      <div>
            <Link to="/all-profiles">
              <button className="btn btn-primary">Go to All Profiles</button>
            </Link>
          </div>
    </div>
  );
}

export default EditProfile;
