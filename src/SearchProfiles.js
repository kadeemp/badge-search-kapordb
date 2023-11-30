import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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

    const results = querySnapshot.docs.map((doc) => ({  ...doc.data() }));
    setSearchResults(results);
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]); // Trigger search when searchText changes

  return (
    <div style={{ textAlign: 'center'}}>
      <h1>Search Profiles</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <div className="profile-cards">
            {searchResults.map((result) => (
              <Link to={`/profile/${result.profileID}`} key={result.id}>
                <div className="profile-card">
                  <h3>{`${result.fname} ${result.lname}`}</h3>

                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default SearchPage;
