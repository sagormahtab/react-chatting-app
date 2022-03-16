import React from 'react';
import './Chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import ActiveList from '../ActiveList/ActiveList';
let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    let location = useLocation();
    const ENDPOINT = 'localhost:5000';

    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, (error)=>{
            if(error) {
                alert(error);
            }
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        }
    },[ENDPOINT, location.search]);

    useEffect(()=>{
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on('roomData', ({users})=>{
            setUsers(users);
        })
    }, [messages, users]);

    //function to handle message
    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, ()=> {setMessage('')});
        }
    }
 
    return (
        <div className="outerContainer">
            <div className="chatBoxContainer">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <div className="activeListContainer">
                <ActiveList users={users} />
            </div>
        </div>
    );
};

export default Chat;