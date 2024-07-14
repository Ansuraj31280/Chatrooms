import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import JoinRoom from './components/JoinRoom';
import RoomList from './components/RoomList';
import Chat from './components/Chat';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [inRoom, setInRoom] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch the list of active rooms from the server
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3001/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleJoinRoom = (username, roomName) => {
    setUsername(username);
    setRoom(roomName);
    setInRoom(true);
    setIsOwner(false);
  };

  const handleCreateRoom = (username, roomName) => {
    setUsername(username);
    setRoom(roomName);
    setInRoom(true);
    setIsOwner(true);
  };

  const handleExitRoom = () => {
    setInRoom(false);
    setUsername('');
    setRoom('');
  };

  return (
    <Container fluid>
      {!inRoom ? (
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center">Chat Application</h1>
            <JoinRoom onJoin={handleJoinRoom} onCreate={handleCreateRoom} />
            <RoomList rooms={rooms} onRoomSelect={(roomName) => handleJoinRoom(username, roomName)} />
          </Col>
        </Row>
      ) : (
        <Chat username={username} room={room} isOwner={isOwner} onExit={handleExitRoom} />
      )}
    </Container>
  );
}

export default App;
