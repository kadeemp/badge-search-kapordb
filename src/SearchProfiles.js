import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Replace with the correct import for your Firebase configuration

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchText.trim() === '') {
      // If search text is empty, clear results
      setSearchResults([]);
      return;
    }

    const q = query(
      collection(db, 'profiles'),
      where('fname', '>=', searchText),
      where('fname', '<=', searchText + '\uf8ff') // Firestore range query for partial matching
    );

    const querySnapshot = await getDocs(q);

    const results = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
    setSearchResults(results);

    // Trigger animation when search results are updated
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]); // Trigger search when searchText changes

  useEffect(() => {
    // Reset animation state to trigger animation on the next update

  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      <br />
      <br />
      <h1>DEIB For Startups Badge Verification</h1>
      <br />
      <div style={{ border: '2px solid black', padding: '20px', margin: '20px', display: 'inline-block', textAlign: 'left'  }}>
        <h3 style={{ textAlign: 'center' }}>🚀 Welcome to the DEIB for Startups Badge Verification Platform! 🏆</h3>
<p style={{ textAlign: 'center' }}> Congratulations to all the trailblazers who've successfully completed the program! 🎉 Here, we make it seamless for you to verify the courses you've earned credits for. </p>

<p style={{ textAlign: 'center' }}>🔍 Use the search field below to type in your first name and discover your profile.</p>

        <h3 style={{ textAlign: 'center' }}>How to Verify Your Badges:</h3>
        <ol>
          <li><strong>Enter Your First Name:</strong>(Case Sensitive)</li>
          <li><strong>Click on your Profile:</strong> Our system will confirm your achievements and display the badges you've earned.</li>
          <li><strong>Update your LinkedIn:</strong> Use the verified badges to enhance your profile, share on social media, or include in your professional portfolio.</li>
        </ol>

        <input
          type="text"
          placeholder="Search by First Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
    width: '300px', // Set the width as desired
    margin: '0 auto', // Center the input horizontally
    display: 'block', // Ensure it's a block-level element for centering
  }}
        />

        {searchResults.length > 0 && (
          <div>
            <h2>Search Results:</h2>
            <div className={`profile-cards `}>
              {searchResults.map((result) => (
                <Link to={`/profile/${result.profileID}`} key={result.id}>
                  <div className="profile-card" style={{ border: '2px solid black', padding: '10px', margin: '10px' }}>
                    <h3>{`${result.fname} ${result.lname}`}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default SearchPage;
