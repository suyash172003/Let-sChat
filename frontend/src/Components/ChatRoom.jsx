import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function ChatRoom() {
  const location = useLocation()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState('')
  const [roomId, setRoomId] = useState('')
  const [stompClient, setStompClient] = useState(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/messages/${location.state.room}`)
        setMessages(response.data)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchMessages()

    const socket = new SockJS('http://localhost:8080/chat')
    const stompClient = Stomp.over(socket)
    setStompClient(stompClient)
    setUser(location.state.username)
    setRoomId(location.state.room)

    stompClient.connect({}, () => {
      console.log('Connected to server')
      stompClient.subscribe(`/topic/messages/${location.state.room}`, (message) => {
        const newMessage = JSON.parse(message.body)
        setMessages(prevMessages => [...prevMessages, newMessage])
      })
    })

    return () => {
      if (stompClient) {
        stompClient.disconnect()
      }
    }
  }, [location.state.room, location.state.username])

  const handleSendMessage = () => {
    if (stompClient && message.trim()) {
      console.log('Sending message:', message)
      stompClient.send(`/app/sendMessage/${location.state.room}`, {}, JSON.stringify({ user, content: message, roomId }))
      setMessage('')
    }
  }

  return (
    <div className='h-screen w-screen bg-gray-900 flex items-center justify-center'>
      <div className='h-full w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg flex flex-col'>
        <div className='h-16 w-full bg-gray-700 flex items-center justify-center rounded-t-lg'>
          <h1 className='font-sans text-3xl text-white font-bold'>Chat Room</h1>
        </div>
        <div className='flex-1 overflow-auto p-4 mt-16 mb-16'>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.user === user ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`${message.user === user ? 'bg-orange-500' : 'bg-green-500'} text-white p-3 rounded-lg max-w-xs break-words`}>
                <p><strong>{message.user}:</strong> {message.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex w-full p-4 bg-gray-700 rounded-b-lg'>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className='flex-1 p-2 border border-gray-600 rounded-lg bg-gray-800 text-white'
          />
          <button onClick={handleSendMessage} className='ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom