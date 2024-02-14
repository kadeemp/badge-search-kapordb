import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [profileData, setProfileData] = useState({
    fname: '',
    lname: '',
    password: '',
    id: '',
    date: '',
    badgeID:'',
    c1Complete: false,
    c2Complete: false,
    c3Complete: false,
    c4Complete: false,
  });
  const badgeStyle = { width: '270px', height: '270px' };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const checkPassword = () => {

    if (profileData.password === password) {
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
    }
  };

  const toRequestPassword = () => {
    navigate("/request-password")
  }

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'profiles'), where('profileID', '==', `${id}`));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const fetchedData = querySnapshot.docs[0].data();
        setProfileData(fetchedData);
      }
    };

    fetchData();
  }, [id]);

  const BadgeContainer = ({ children }) => (
    <div className="badge-container">{children}</div>
  );



  // Helper component to render badge download buttons
  const BadgeDownloadButton = ({ badgeNumber, url }) => (
    <a href={url} download={`Badge${badgeNumber}.png`}>
      <button style={{ width: '100%', padding: '10px', margin: '10px 0', backgroundColor: '#004a99', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Download Badge {badgeNumber}
      </button>
    </a>
  );
  const themeColors = {
   primary: '#004a99',
   secondary: '#ccc',
   text: '#003366',
   background: '#f9f9f9',
   border: '#004a99',
 };

 const styles = {
   card: {
     margin: '30px auto 30px',
     width: '70%',
     marginBottom: '20px',
     border: `2px solid ${themeColors.border}`,
     backgroundColor: themeColors.background,
     borderRadius: '15px'
   },
   cardTitle: {
     paddingTop: '20px',
     paddingLeft: '20px',
     color: themeColors.text,
     textAlign: 'center'
   },
   cardBody: {
     textAlign: 'center',
     padding: '25px',
   },
   badgeStyle: {
     width: '270px',
     height: '270px',
   },

   button: {
     width: '100%',
     padding: '0px',
     backgroundColor: themeColors.primary,
     color: 'white',
     border: 'none',
     borderRadius: '5px',
     cursor: 'pointer',
     margin: '10px 0',
     fontWeight: 'bold'

   },

   backButton: {
     width: '94%',
     padding: '10px',
     backgroundColor: themeColors.secondary,
     color: 'white',
     border: 'none',
     borderRadius: '5px',
     cursor: 'pointer',
     margin: '30px 0',
     textAlign: 'center',
     fontWeight: 'bold'
   },
   backButtonContainer: {
      display: 'flex',
      justifyContent: 'center', // centers the button horizontally
      alignItems: 'center', // centers the button vertically
      width: '100%'
    },

 };

  return (
    <div>
    <div className="card" style={styles.card}>
       <h1 className="card-title" style={styles.cardTitle}>{profileData.fname} {profileData.lname}</h1>
       <div className="card-body" style={styles.cardBody}>

          {/* Optional Badges */}
          <div className="badge-container">
            {profileData.c1Complete && (
              <BadgeContainer>
                <img
                  style={badgeStyle}
                  src={`https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F1-DEIB%20101.png?alt=media&token=6d882a58-f5e9-453e-997b-031e9cce280e`}
                  alt="Badge 1"
                />
              </BadgeContainer>
            )}
            {profileData.c2Complete && (
              <BadgeContainer>
                <img
                  style={badgeStyle}
                  src={`https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F2-Inclusive%20Hiring%20Practices.png?alt=media&token=9dc35c84-9902-49ff-af82-8a75a0941894`}
                  alt="Badge 2"
                />
              </BadgeContainer>
            )}
            {profileData.c3Complete && (
              <BadgeContainer>
                <img
                  style={badgeStyle}
                  src={`https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F3-CreatingInclusiveCulture.png?alt=media&token=3cba8e3a-1639-4335-bb9f-3a500736c80b`}
                  alt="Badge 3"
                />
              </BadgeContainer>
            )}
          </div>


          <div style={{ marginTop: '20px' }}>
            <input
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ width: '97%', padding: '10px', margin: '20px 0' }}
            />
            <button
              onClick={checkPassword}
              style={{ width: '100%', padding: '10px', backgroundColor: '#004a99', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Submit Password
            </button>

            <button
              onClick={toRequestPassword}
              style={{ width: '100%', padding: '10px', backgroundColor: '#82CFDC', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop:'20px' }}
            >
            Request Password
            </button>

            {isPasswordCorrect && (
              <>
                {profileData.c1Complete && profileData.c2Complete && profileData.c3Complete ? (

                  <div>
                  <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Badge Earning Criteria</h3>
                  <div style={{ marginBottom: '20px' }}>
                    <p>Badges are awarded to participants who completed 80% or more of each course. </p>
                    </div>
                  <h3 style={{ textAlign: 'center', marginTop: '20px' }}>How to Download Badge</h3>
                  <div style={{ marginBottom: '20px' }}>
                    <p>Once you've clicked on the link below, you can follow these steps to download each badge:</p>
                    <ul>
                      <li>Right-click any image and choose "Download"</li>
                      <li>Alternatively, hover over the image and click the download button (second from the right)</li>
                      <li>Another alternative: Hover over the image and click the options button to the far right, then click "Download</li>
                    </ul>
                    </div>
                  <a href="https://drive.google.com/drive/folders/13ftaqqoQK7MJhLbMmBKfVA3A2_aGKGgO?usp=sharing" target="_blank" style={{ display: 'block', marginTop: '20px' }}>
                    <button style={{ width: '100%', padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                      Badge Folder
                    </button>
                  </a>
                  <div>
                  <h3> Badge ID: {profileData.badgeID} </h3>
                  </div>

                  <h3 style={{ textAlign: 'center', marginTop: '20px' }}>How to Upload Badge to LinkedIn</h3>
                  <div style={{ marginBottom: '20px' }}>
                    <p>To upload your badges to LinkedIn:</p>
                    <ul>
                      <li>Go to your profile</li>
                      <li>Under your profile photo, click "Add profile" section</li>
                      <li>Towards the bottom, click the "Recommended" row for dropdown options </li>
                      <li>Click Add license or certification</li>
                   </ul>
                     <p>On this page, you'll fill out the information as follows:</p>
                     <ul>
                       <li>Name: DEIB for Startups Course Badge Set</li>
                       <li>Issuing organization: Kapor Center </li>
                       <li>Issue date: Month & Year issued for you </li>
                       <li>Credential ID: Enter your Badge ID</li>
                       <li>Credential URL: Enter the url of your badge page.</li>
                     </ul>
                     <p>Lastly, you'll upload the badge images by clicking "+Add Media", then "Upload Media." Please upload them with the following titles:</p>
                     <ul>
                       <li>Badge 1: Foundational Knowledge</li>
                       <li>Badge 2: Inclusive Hiring</li>
                       <li>Badge 3: Inclusive Culture</li>
                     </ul>
                    </div>
                  </div>
                ) : (

                  <div>
                  <div>
                  <h3> Badge ID: {profileData.badgeID} </h3>
                  </div>
                  <h3 style={{ textAlign: 'center', marginTop: '20px' }}>How to Download Badge</h3>
                  <div style={{ marginBottom: '20px' }}>
                    <p>Once you've clicked on the link below, you can follow these steps to download each badge:</p>
                    <ul>
                      <li>Right click the image</li>
                      <li>Click Save Image As</li>
                      <li>Enter your desired badge title or click Save</li>
                      <li>Click Save</li>
                    </ul>
                    </div>
                  {profileData.c1Complete && <BadgeDownloadButton badgeNumber={1} url="https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F1-DEIB%20101.png?alt=media&token=6d882a58-f5e9-453e-997b-031e9cce280e" />}
     {profileData.c2Complete && <BadgeDownloadButton badgeNumber={2} url="https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F2-Inclusive%20Hiring%20Practices.png?alt=media&token=9dc35c84-9902-49ff-af82-8a75a0941894" />}
     {profileData.c3Complete && <BadgeDownloadButton badgeNumber={3} url="https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F3-CreatingInclusiveCulture.png?alt=media&token=3cba8e3a-1639-4335-bb9f-3a500736c80b" />}
     <h3 style={{ textAlign: 'center', marginTop: '20px' }}>How to Upload Badge to LinkedIn</h3>
     <div style={{ marginBottom: '20px' }}>
       <p>Here's a guide on how to upload your badges to LinkedIn:</p>
       <ul>
         <li>Go to your profile</li>
         <li>Under your profle photo, click Add profile section</li>
         <li>Towards the bottom, click the "Reccomended" row for dropdown options </li>
         <li>Click Add license or certification</li>
      </ul>
        <p>On this page, you'l fill out the information as follows:</p>
        <ul>
          <li>Name: DEIB for Startups Course Badge Set</li>
          <li>Issuing organization: Kapor Center </li>
          <li>Issue date: Month & Year issued for you </li>
          <li>Credential ID: Enter your Badge ID</li>
          <li>Credential URL: Enter the url of your badge page.</li>
        </ul>
        <p>Lastly, you'll upload the badge images by clicking "+Add Media", then "Upload Media". Please upload them with the following titles:</p>
        <ul>
          <li>Badge 1: Inclusive Hiring</li>
          <li>Badge 2: Foundational Knowledge</li>
          <li>Badge 3: Inclusive Culture</li>
        </ul>
       </div>
   </div>
                )}
              </>
            )}
          </div>
        </div>
        <div style={styles.backButtonContainer}>

        <button
          onClick={handleBack}
          className="btn btn-secondary"
          style={styles.backButton}
        >
          Back
        </button>
      </div>
      </div>

    </div>
  );
};

export default Profile;
