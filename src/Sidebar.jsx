import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar-rail">
      <div className="sidebar-top">
        <button className="nav-icon" aria-label="Home"><i className="bi bi-instagram"></i></button>
        <button className="nav-icon active" aria-label="Home"><i className="bi bi-house-door-fill"></i></button>
        <button className="nav-icon" aria-label="Search"><i className="bi bi-search"></i></button>
        <button className="nav-icon" aria-label="Explore"><i className="bi bi-compass"></i></button>
        <button className="nav-icon" aria-label="Reels"><i className="bi bi-camera-reels"></i></button>
        <button className="nav-icon" aria-label="Messages">
          <i className="bi bi-chat-left"></i>
          <span className="badge">2</span>
        </button>
        <button className="nav-icon" aria-label="Notifications"><i className="bi bi-heart"></i></button>
        <button className="nav-icon" aria-label="Create"><i className="bi bi-plus-square"></i></button>
        <button className="nav-icon" aria-label="Profile" onClick={() => navigate('/profile')}>
          <i className="bi bi-person-fill"></i>
        </button>
      </div>

      <div className="profile-bubble" aria-label="Profile avatar" />
    </aside>
  )
}

export default Sidebar