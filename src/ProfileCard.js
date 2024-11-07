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
                <img style={badgeStyle} src={`https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F1-DEIB%20101.png?alt=media&token=6d882a58-f5e9-453e-997b-031e9cce280e`} alt="Badge 1" />
              </div>
            )}
            {props.c2Complete && (
              <div>
                <img style={badgeStyle} src={`https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F2-Inclusive%20Hiring%20Practices.png?alt=media&token=9dc35c84-9902-49ff-af82-8a75a0941894`} alt="Badge 2" />
              </div>
            )}
            {props.c3Complete && (
              <div>
                <img style={badgeStyle} src={`https://firebasestorage.googleapis.com/v0/b/deib-for-startups.appspot.com/o/badges%2F3-CreatingInclusiveCulture.png?alt=media&token=3cba8e3a-1639-4335-bb9f-3a500736c80b`} alt="Badge 3" />
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
