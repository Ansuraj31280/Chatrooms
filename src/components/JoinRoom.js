import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function JoinRoom({ onJoin, onCreate }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const handleJoin = (event) => {
    event.preventDefault();
    if (username && room) {
      onJoin(username, room);
    }
  };

  const handleCreate = (event) => {
    event.preventDefault();
    if (username && room) {
      onCreate(username, room);
    }
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Room Name</Form.Label>
        <Form.Control
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" onClick={handleJoin} className="mr-2">
        Join Room
      </Button>
      <Button variant="success" onClick={handleCreate}>
        Create Room
      </Button>
    </Form>
  );
}

export default JoinRoom;
