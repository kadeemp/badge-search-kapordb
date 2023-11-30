import React from 'react';
import ReactDOM from 'react-dom';
import { Link , useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";



const ProfileCard = (props) =>  {
const Nav = useNavigate();
const badgeStyle = { width: '270px', height: '270px' };

return (
      <div>
        <div className="card" style={{margin:"auto", width:"50%", marginBottom:"20px"}}>
          <h5 className="card-title" style={{paddingTop:"20px", paddingLeft:"20px", textAlign: 'center' }} ></h5>
          <div className="card-body" style={{textAlign: "left"}}>

            <div style={{display:"inline", textAlign: 'center' }}>
                <h2></h2> <h3>{props.fname} {props.lname}</h3>
            </div>
            <div style={{display: 'flex', alignItems: 'center' }} >
            {props.c1Complete && (
              <div>
                <img style={badgeStyle} src={`https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F1-CreatingCulture.png?alt=media&token=cff9bbcf-af69-44aa-a386-13fd3c10358f`} alt="Badge 1" />
              </div>
            )}
            {props.c2Complete && (
              <div>
                <img style={badgeStyle} src={`https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F2-FoundationalKnowledge.png?alt=media&token=12dd78d9-5588-472d-b15a-879d20bd57ec`} alt="Badge 2" />
              </div>
            )}
            {props.c3Complete && (
              <div>
                <img style={badgeStyle} src={`https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F3-InclusiveHiring.png?alt=media&token=985cdbde-0727-4fff-9de9-e75ad81fdc80`} alt="Badge 3" />
              </div>
            )}
            {props.c4Complete && (
              <div>
              </div>
            )}
            </div>

            <div >
            {/*  */}
              <Link to={'/edit-profile/' + props.id}>
                <button className="btn btn-primary" style={{textAlign: "center", margin:"10px"}}>Edit Profile</button>
              </Link>
            </div>
            <div >

            </div>
          </div>
        </div>
      </div>
    )
}

export default ProfileCard;
