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
    <div className='h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500'>
      <div className='bg-gray-900 p-8 rounded-lg shadow-2xl'>
        <h1 className='text-3xl text-white mb-4 font-bold'>Join Chat</h1>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-full p-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
        <input
          type='text'
          placeholder='Room'
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className='w-full p-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
        <button
          onClick={handleJoin}
          className='w-full p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300'
        >
          Join
        </button>
      </div>
    </div>
  )
}

export default JoinChat