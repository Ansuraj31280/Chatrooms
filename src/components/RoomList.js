import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RoomList({ onRoomSelect }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      const result = await axios.get('http://localhost:3001/rooms');
      setRooms(result.data);
    }
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id} onClick={() => onRoomSelect(room.name)}>
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
