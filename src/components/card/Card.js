import React from 'react';
import Owner from '../owner/Owner';
import './Card.css';

export default function Card({data}){
    // the way we use data here is kinda like destructuring
    return(
        <div className="card">
            <h2>{data.title}</h2>
            <div className="meta">
                <Owner profile_image={data.owner.profile_image} 
                    display_name={data.owner.display_name} 
                />
                <div className="count">
                    {`Views: ${data.view_count} | Answers: ${data.answer_count}`}
                </div>
            </div>
        </div>
    )
}
