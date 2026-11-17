import axios from "axios";
import React, { useEffect, useState } from "react";

const normalizeAsset = (value) => {
  if (!value) return '';
  return value.replace(/\\/g, '/').replace(/^src\/assets\//, '/assets/');
};

function Suggestions() {
  const [profile, serProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("/api/profile")
      .then((data) => data.json())
      .then((data) => serProfile(data))
      .catch((err) => console.log(err));

    fetch("/api/suggestions")
      .then((data) => data.json())
      .then((data) => setSuggestions(data))
      .catch((err) => console.log(err));
  }, []);

  const handleFollow = async (id, username) => {
    axios.post('/api/followers', { id, username })
      .then(() => alert('followed'))
      .catch((err) => console.log(err));
  };

  return (
    <aside className="app-suggestions">
      <div className="suggestion-header">
        {profile ? (
          <>
            <img src={normalizeAsset(profile.profile_pic)} alt={profile.username} />
            <div className="user-meta">
              <div style={{ fontWeight: 700 }}>{profile.username}</div>
            </div>
            <span className="switch-link">Switch</span>
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>

      <div className="suggestion-section">
        <div className="section-title">
          <span>Suggested for you</span>
          <a href="#">See all</a>
        </div>

        <div className="suggestion-list">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div className="suggestion-item" key={suggestion.id}>
                <img src={normalizeAsset(suggestion.profile_pic)} alt={suggestion.username} />
                <div className="suggestion-name">
                  <strong>{suggestion.username}</strong>
                  <span>Suggested for you</span>
                </div>
                <button className="follow-btn" onClick={() => handleFollow(suggestion.id, suggestion.username)}>Follow</button>
              </div>
            ))
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>

      <div className="footer-meta">
        About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language
        <br />
        © 2026 INSTAGRAM FROM META
      </div>
    </aside>
  );
}

export default Suggestions;
