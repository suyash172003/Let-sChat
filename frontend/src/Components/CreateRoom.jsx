import React from 'react'
import { use } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreateRoom() {
  const [owner, setOwner] = useState('')
  const [guest, setGuest] = useState('')
  const [room, setRoom] = useState('')
  const navigate = useNavigate()
  
  const handleCreate = async() => {
    if (owner.trim() && guest.trim() && room.trim()) {
      try {
        const response = await axios.post('http://localhost:8080/createRoom', { roomId:room ,owner:owner, guest:guest })
        console.log(response.status)
        if (response.status === 200) {
          navigate(`/room`, { state: { username:owner, room:room } })
        }
      }
      catch (error) {
        console.error('Error creating room:', error)
      }
    }
  }
  return (

    <div className='h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500'>
        <div className='bg-gray-900 p-8 rounded-lg shadow-2xl'>
            <h1 className='text-3xl text-white mb-4 font-bold'>Create Room</h1>
            <input
              type='text'
              placeholder='Owner'
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className='w-full p-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            <input
              type='text'
              placeholder='Guest'
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
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
              className='w-full p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300'
              onClick={handleCreate}
            >
              Create
            </button>
        </div>
    </div>
  )
}

export default CreateRoom