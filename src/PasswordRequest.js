import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Your Firebase configuration
import emailjs from '@emailjs/browser'; // Import emailjs

function PasswordRequest() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Initialize your EmailJS
    emailjs.init('Vqoy3Ij2lFPOK5d78'); // Replace 'YOUR_PUBLIC_KEY' with your actual public key

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

  return (
    <div className="password-request-container">
      <p>
        Enter the email you applied to the class with to receive a password reset link in your email.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PasswordRequest;
