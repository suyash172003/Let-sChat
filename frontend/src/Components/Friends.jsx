import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Friends() {
  const navigate = useNavigate()
  const location = useLocation()
  const [rooms, setRooms] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/rooms/${location.state.username}`)
        setRooms(response.data)
      } catch (error) {
        console.error('Error fetching rooms:', error)
      }
    }
    fetchRooms()
  }, [location.state.username])

  const handleJoinRoom = (room) => {
    navigate(`/chatRoom`, { state: { username: location.state.username, room: room.roomId } })
  }

  const filteredRooms = rooms.filter(room =>
    room.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.guest.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='h-screen w-screen bg-gray-900 flex flex-col items-center justify-center'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-2xl'>
        <h1 className='text-3xl text-white mb-4 font-bold'>Friends</h1>
        <input
          type='text'
          placeholder='Search rooms...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white'
        />
        <ul className='w-full'>
          {filteredRooms.map((room, index) => (
            <li key={index} className='flex justify-between items-center p-2 mb-2 bg-gray-700 rounded-lg'>
              <span className='text-white'>Room ID: {room.roomId} - Owner: {room.owner} - Guest: {room.guest}</span>
              <button
                onClick={() => handleJoinRoom(room)}
                className='p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Friends