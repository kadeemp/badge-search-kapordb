import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Replace with the correct import for your Firebase configuration
import ProfileCard from './ProfileCard'; // Replace with the correct path for your ProfileCard component
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({
    fname: '',
    lname: '',
    id: '',
    date: '',
    c4Complete: false,
  });
  const badgeStyle = { width: '270px', height: '270px' };
  const navigate = useNavigate();

  const handleBack = () => {
      navigate('/');
    };

  useEffect(() => {
    const fetchData = async () => {
      // Your checkIfAuthenticated function goes here

      const q = query(collection(db, 'profiles'), where('profileID', '==', `${id}`));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("SUCCESS searching for" + id);

        const fetchedData = querySnapshot.docs[0].data();
        setProfileData(fetchedData);
      } else {
        console.log("FAILURE.  nothing found searching for" + id);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <div className="card" style={{ margin: 'auto', width: '50%', marginBottom: '20px' }}>
        <h1 className="card-title" style={{ paddingTop: '20px', paddingLeft: '20px' }}>{profileData.fname} {profileData.lname}</h1>
        <div className="card-body" style={{ textAlign: 'left' }}>


          <div>
            {/* Optional Badges */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {profileData.c1Complete && (
                <div style={{ textAlign: 'center' }}>
                  <img
                    style={badgeStyle}
                    src={`https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F1-CreatingCulture.png?alt=media&token=cff9bbcf-af69-44aa-a386-13fd3c10358f`}
                    alt="Badge 1"
                  />
                  <h2>Course 1</h2>
                </div>
              )}
              {profileData.c2Complete && (
                <div style={{ textAlign: 'center' }}>
                  <img
                    style={badgeStyle}
                    src={`https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F2-FoundationalKnowledge.png?alt=media&token=12dd78d9-5588-472d-b15a-879d20bd57ec`}
                    alt="Badge 2"
                  />
                  <h2>Course 2</h2>
                </div>
              )}
              {profileData.c3Complete && (
                <div style={{ textAlign: 'center' }}>
                  <img
                    style={badgeStyle}
                    src={`https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F3-InclusiveHiring.png?alt=media&token=985cdbde-0727-4fff-9de9-e75ad81fdc80`}
                    alt="Badge 3"
                  />
                  <h2>Course 3</h2>
                </div>
              )}
            </div>
          </div>

        </div>
        <button onClick={handleBack} className="btn btn-secondary">
      Back
    </button>
      </div>
    </div>
  );
};

export default Profile;
