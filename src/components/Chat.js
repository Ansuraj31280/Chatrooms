import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:3001');

function Chat({ username, room, isOwner, onExit }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit('join_room', { username, room });
  }, [username, room]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('send_message', { message, username, room });
      setMessage('');
    }
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleExit = () => {
    socket.emit('leave_room', { username, room });
    onExit();
  };

  const handleDelete = () => {
    socket.emit('delete_room', { room });
    onExit();
  };

  return (
    <Container fluid className="chat-app">
      <Row>
        <Col>
          <div className="chat-header">
            <h3>Chat Room: {room}</h3>
            <div>
              <Button className="btn-exit" onClick={handleExit}>
                Exit Room
              </Button>
              {isOwner && (
                <Button className="btn-exit" onClick={handleDelete}>
                  Delete Room
                </Button>
              )}
            </div>
          </div>
          <div className="chat-body">
            <div className="message-feed">
              {messages.map((msg, index) => (
                <div key={index} className="message">
                  <strong>{msg.username}: </strong>
                  {msg.message}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="chat-footer">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="primary" onClick={sendMessage}>
                Send
              </Button>
            </InputGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
