import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function JoinChat() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const navigate = useNavigate()

  const handleJoin = () => {
    if (username.trim() && room.trim()) {
      navigate(`/chatroom`, { state: { username, room } })
    }
  }

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-gray-900'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl text-white mb-4'>Join Chat</h1>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white'
        />
        <input
          type='text'
          placeholder='Room'
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className='w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white'
        />
        <button
          onClick={handleJoin}
          className='w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
        >
          Join
        </button>
      </div>
    </div>
  )
}

export default JoinChat