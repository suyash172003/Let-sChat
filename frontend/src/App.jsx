import React from 'react'
import ChatRoom from './Components/ChatRoom'
import JoinChat from './Components/JoinChat'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import CreateRoom from './Components/CreateRoom'
import Friends from './Components/Friends'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinChat />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/room" element={<Friends />} />
        <Route path='/createRoom' element={<CreateRoom />} />
      </Routes>
    </Router>
  )
}

export default App