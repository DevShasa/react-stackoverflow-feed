import React from 'react';
import './Owner.css'

export default function Owner(props){
    return(
        <div className="owner">
            <img src={props.profile_image} alt="avatar"/>
            <h3>{props.display_name}</h3>
        </div>
    ) 
} 