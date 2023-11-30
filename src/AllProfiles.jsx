import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase.js';
import { storage } from "./firebase";
import ProfileCard from './ProfileCard';

function AllProfiles() {
  const profilesCollectionRef = collection(db, "profiles");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocs(profilesCollectionRef);
        const profilesData = response.docs.map((item) => item.data());
        setProfiles(profilesData);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function createProfile(profile) {
    return (
      <ProfileCard
        key={profile.key}
        date={profile.dateAdded}
        fname={profile.fname}
        lname={profile.lname}
        c1Complete={profile.c1Complete}
        c2Complete={profile.c2Complete}
        c3Complete={profile.c3Complete}
        c4Complete={profile.c4Complete}
        id={profile.profileID}
      />
    );
  }

  return (
    <div style={{ textAlign: 'center'}}>
      <h1>All Profiles</h1>
      {loading ? (
        <p>Loading profiles...</p>
      ) : (
        profiles.map(createProfile)
      )}
    </div>
  );
}

export default AllProfiles;
