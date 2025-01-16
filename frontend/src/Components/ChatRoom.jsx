import React, { useEffect, useState, useRef } from 'react'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { FaPaperPlane } from 'react-icons/fa'

function ChatRoom() {
  const location = useLocation()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState('')
  const [roomId, setRoomId] = useState('')
  const [stompClient, setStompClient] = useState(null)
  const messagesEndRef = useRef(null)

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (stompClient && message.trim()) {
      console.log('Sending message:', message)
      stompClient.send(`/app/sendMessage/${location.state.room}`, {}, JSON.stringify({ user, content: message, roomId, timestamp: new Date().toISOString() }))
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className='h-screen w-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center'>
      <div className='h-full w-full max-w-4xl bg-gray-900 rounded-lg shadow-2xl flex flex-col'>
        <div className='h-16 w-full bg-gray-800 flex items-center justify-between px-4 rounded-t-lg'>
          <h1 className='font-sans text-3xl text-white font-bold'>Chat Room - {roomId}</h1>
          <div className='text-white'>
            <span className='font-semibold'>User:</span> {user}
          </div>
        </div>
        <div className='flex-1 overflow-auto p-4 scrollbar-hide'>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.user === user ? 'justify-end' : 'justify-start'} mb-4 items-center`}>
              {message.user !== user && (
                <div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white mr-2'>
                  {message.user.charAt(0).toUpperCase()}
                </div>
              )}
              <div className={`${message.user === user ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 'bg-gradient-to-r from-green-500 to-green-700'} text-white p-3 rounded-lg max-w-xs break-words shadow-lg`}>
                <p>{message.content}</p>
                <p className='text-xs text-gray-300 mt-1'>{new Date(message.timestamp).toLocaleTimeString()}</p>
              </div>
              {message.user === user && (
                <div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white ml-2'>
                  {message.user.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className='flex w-full p-4 bg-gray-800 rounded-b-lg'>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className='flex-1 p-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
          <button onClick={handleSendMessage} className='ml-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300'>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom