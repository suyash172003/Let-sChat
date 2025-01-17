import React, { useEffect, useState, useRef } from 'react'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { FaPaperPlane } from 'react-icons/fa'
import avatar1 from '../assets/avatar.jpg'
import avatar2 from '../assets/avatar.jpg'

function ChatRoom() {
  const location = useLocation()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState('')
  const [roomId, setRoomId] = useState('')
  const [stompClient, setStompClient] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/messages/${location.state.room}`)
        if (Array.isArray(response.data)) {
          setMessages(response.data)
        } else {
          console.error('Error: Response data is not an array')
        }
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
        scrollToBottom()
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
      const newMessage = {
        user,
        content: message,
        roomId,
        timestamp: new Date().toLocaleTimeString()
      }
      stompClient.send(`/app/sendMessage/${location.state.room}`, {}, JSON.stringify(newMessage))
      setMessage('')
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    } else {
      setIsTyping(true)
    }
  }

  const handleLeave = () => {
    window.location.href = '/'
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className='h-screen w-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center'>
      <div className='h-full w-full max-w-4xl bg-gray-900 rounded-lg shadow-2xl flex flex-col'>
        <div className='h-16 w-full bg-gray-800 flex items-center justify-between px-4 rounded-t-lg'>
          <div className='flex items-center'>
            <img src={avatar1} alt='avatar' className='w-10 h-10 rounded-full mr-2' />
            <div className='text-white'>
              <span className='font-semibold'>User:</span> {user}
            </div>
          </div>
          <button onClick={handleLeave} className='p-2 bg-red-600 text-white rounded-lg hover:bg-red-700'>
            Leave
          </button>
        </div>
        <div className='flex-1 overflow-auto p-4'>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.user === user ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className='flex items-center'>
                <img src={message.user === user ? avatar1 : avatar2} alt='avatar' className='w-10 h-10 rounded-full mr-2' />
                <div className={`${message.user === user ? 'bg-blue-500' : 'bg-green-500'} text-white p-3 rounded-lg max-w-xs break-words`}>
                  <p><strong>{message.user}:</strong> {message.content}</p>
                  <p className='text-xs text-gray-300'>{message.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {isTyping && <div className='text-gray-400 text-sm px-4'>Typing...</div>}
        <div className='h-16 w-full bg-gray-800 flex items-center justify-between px-4 rounded-b-lg'>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className='flex-1 p-2 border border-gray-600 rounded-lg bg-gray-700 text-white mr-4'
          />
          <button onClick={handleSendMessage} className='p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center'>
            <FaPaperPlane className='mr-2' /> Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom