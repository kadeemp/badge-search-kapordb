

// import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { db } from './firebase.js'
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query, where
} from "firebase/firestore";


function CertSearch(props) {
 const navigate = useNavigate()
    const [textField, setTextField] = useState("id");
    const [pageNumber, setPageNumber] = useState(1)
    const [url, setURL] = useState("")


    const certificatesCollectionRef = collection(db,"certificates")

   async function handleClick(event) {
     event.preventDefault()
    loader()

   }

   async function loader() {

       const q = query(collection(db, "certificates"), where("id", "==", `${textField}`));
       const querySnapshot = await getDocs(q);
       console.log(querySnapshot.empty);

       if (querySnapshot.empty == true) {

       } else {
         querySnapshot.forEach((doc) => {
           // doc.data() is never undefined for query doc snapshots

           let returned = doc.data()
           if ( returned.level == 0 ) {
             console.log("level is 0");
           } else {
             navigate(`/${returned.id}`)
           }
           console.log(returned,1);
         });
       }
   }

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
  };
  return (
    <div style={{backgroundColor:"#0F2A8E", height:"500px", position:"relative"}}>>
      <h2 style={{marginLeft:"20px", color:"white"}}>Welcome to the DEIB for Startups Badge Database</h2>
      <h4 style={{marginLeft:"20px", color:"white"}}>Enter the Certificate ID number to find a certificate. Please use numbers only (not the #/pound sign).</h4>

      <br/>

      <div className="card" style={{margin:"auto", width:"25%", marginBottom:"20px", padding:40, position:"absolute", top: "50%",left:"50%", transform: "translate(-50%, -50%)"}}>

          <input className="form-control" style={{marginBottom:"10px" , width:"100%"}} placeholder="Certificate ID " id="id" type="text" onChange={(event) => {setTextField(event.target.value);}}/>
          <button className="btn btn-primary" style={{ width:"100%", backgroundColor: "#96D582", border:"none"}} onClick={handleClick} > <b>Search</b></button>
      </div>
    </div>
  );
}

export default CertSearch;
