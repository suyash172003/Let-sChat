import React from 'react'
import ChatRoom from './Components/ChatRoom'
import JoinChat from './Components/JoinChat'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinChat />} />
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </Router>
  )
}

export default App