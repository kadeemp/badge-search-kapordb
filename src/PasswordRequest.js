import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Your Firebase configuration
import emailjs from '@emailjs/browser'; // Import emailjs
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate

function PasswordRequest() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation(); // Get the current location
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Initialize your EmailJS
    emailjs.init('Vqoy3Ij2lFPOK5d78'); // Replace 'YOUR_PUBLIC_KEY' with your actual public key

//use this code to search for profiles
    const profilesRef = collection(db, "profiles");
    const q = query(profilesRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const profile = querySnapshot.docs[0].data(); // Assuming email is unique and grabbing the first match
      const password = profile.password; // Assuming the document has a 'password' field
      const fname = profile.fname;


      // Prepare the email parameters
      const emailParams = {
        to_name: fname, // Or any other name field you have for the user
        to_email: email, // The recipient email address
        code: password, // The password code you're sending
      };
      // Send the email with the password code
      emailjs.send('service_4q397vv', 'template_ayywfj3', emailParams)
        .then((response) => {
          console.log('Email successfully sent!', response);
          setMessage("A password reset email has been sent to your email address.");
        })
        .catch((error) => {
          console.error("Failed to send email", error);
          setMessage("Failed to send the password reset email. Please try again.");
        });

    } else {
      setMessage("Email could not be found.");
    }
  };

  const handleBack = () => {
    const from = new URLSearchParams(location.search).get('from'); // Get the value of the 'from' query parameter
    if (from) {
      navigate(from); // Navigate back to the previous page
    } else {
      navigate('/'); // Navigate to the home page if 'from' parameter is not provided
    }
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh', // Center vertically in viewport
      padding: '0 30px', // Add horizontal padding for responsiveness
      boxSizing: 'border-box',
      transform: 'translateX(200px)', // Move the container to the right by 200px
    }}>
      <h2 style={{ fontWeight: 'bold' }}>Password Request Form</h2>
      <div style={{
        width: 'calc(100% - 20px)', // Subtract 20px from the width of the viewport
      }}>
        <div style={{
          border: '3px solid #0F2A8E', // Blue border
          borderRadius: '15px', // 15px corner radius
          padding: '15px', // Padding inside the container
          maxWidth: '600px', // Maximum width of the container
          margin: '0 auto', // Center horizontally
          boxSizing: 'border-box',

        }}>
          <p>
            Enter the email you applied to the class with below and click submit to receive an email with your password to receive a password reset link in your email.
          </p>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}> {/* Ensure form takes full width */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{
                margin: '10px 0', // Add margin to the input for spacing
                width: '99%',
                height: '20px' // Make the input width responsive
              }}
            />
            <button type="submit" style={{
              margin: '10px 0', // Add margin to the button for spacing
              width: '100%', // Make the button width responsive
              backgroundColor: '#0F2A8E',
              color: 'white', // Text color set to white


            }}>Submit</button>
          </form>
          {message && <p>{message}</p>}
          <button
          onClick={handleBack}
          style={{
            margin: '10px 0', // Add margin to the button for spacing
            width: '100%', // Make the button width responsive
          }}
        >
          Back
        </button>
        </div>

      </div>
    </div>
  );



}

export default PasswordRequest;
