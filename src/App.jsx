import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Suggestions from './Suggestions'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-feed">
        <Feed />
      </main>
      <Suggestions />
    </div>
  )
}

export default App