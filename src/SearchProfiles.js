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
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#004a99' }}>
    <br/>
    <br/>
      <div style={{ border: '2px solid #004a99', padding: '20px', margin: '20px auto', maxWidth: '800px', textAlign: 'left', backgroundColor: '#f9f9f9'  }}>
        <h2 style={{ borderBottom: '1px solid #004a99', paddingBottom: '10px' }}>Welcome to the Badge Verification Platform!</h2>
        <p style={{ color: 'black'}}>Congratulations to all the trailblazers who've successfully completed the program! Here, we make it easy to verify the courses you've earned credits for.</p>

        <h3>How to Verify Your Badges:</h3>
        <ol style={{ marginLeft: '1.5rem' , color: 'black'}}>
          <li>Enter Your First Name (Case Sensitive)</li>
          <li>Click on your Profile to display the badges you've earned</li>
          <li>Enter the password provided to the email you took the course with</li>
          <li>Update your LinkedIn with the verified badges</li>
        </ol>

        <input
          type="text"
          placeholder="Search by First Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: '90%', // Responsive width
            padding: '10px',
            fontSize: '1rem',
            margin: '20px 0',
            border: '1px solid #004a99',
            borderRadius: '5px',
          }}
        />

        {searchResults.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: '#004a99', fontWeight: 'bold' }}>Search Results:</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {searchResults.map((result) => (
                <Link to={`/profile/${result.profileID}`} key={result.id} style={{ textDecoration: 'none' }}>
                  <div style={{
                    border: '1px solid #004a99',
                    padding: '1rem',
                    margin: '1rem',
                    width: '250px',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease',
                  }}>
                    <h3 style={{ color: '#004a99', margin: '0' }}>{`${result.fname} ${result.lname}`}</h3>
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
