import React from 'react';
import './Join.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input name="name" placeholder="Name" className="joinInput " onChange={(event) => { setName(event.target.value) }} type="text" />
                </div>
                <div>
                    <input name="room" placeholder="Room" className="joinInput mt-20" onChange={(event) => { setRoom(event.target.value) }} type="text" />
                </div>

                <Link onClick={(e) => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
};

export default Join;