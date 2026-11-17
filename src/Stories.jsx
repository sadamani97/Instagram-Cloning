import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const normalizeAsset = (value) => {
  if (!value) return '';
  return value.replace(/\\/g, '/').replace(/^src\/assets\//, '/assets/');
};

function Stories() {
  const [Stories, setStories] = useState([]);
  const navigate = useNavigate();
  let tot = 0;

  useEffect(() => {
    fetch('/api/story')
      .then((data) => data.json())
      .then((data) => setStories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="story-row">
      <div className="d-none">{tot = Stories.length}</div>
      {Stories.length > 0 ? (
        Stories.map((story) => (
          <div key={story.id} className="story-item" onClick={() => navigate(`/story/${story.id}/${tot}`)}>
            <div className="story-ring">
              <img src={normalizeAsset(story.user.profile_pic)} alt={story.user.username} />
            </div>
            <span className="story-name">{story.user.username}</span>
          </div>
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  )
}

export default Stories