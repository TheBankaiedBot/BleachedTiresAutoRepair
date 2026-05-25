import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AIPage(){
    const navigate = useNavigate();

    return(
        <div>
            <button className="back-btn" onClick={() => navigate('/')}>Go Back</button>
            <h1>AI Page</h1>
        </div>
    )
}