import React, { useEffect, useState } from 'react'

const normalizeAsset = (value) => {
  if (!value) return '';
  return value.replace(/\\/g, '/').replace(/^src\/assets\//, '/assets/');
};

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/api/posts')
        .then((data) => data.json())
        .then((data) => setPosts(data))
        .catch((err) => console.log(err));
    }, []);

  return (
    <div className="feed-center">
        {posts.length > 0 ? (
            <div>
                {posts.map((post) => (
                    <article className="post-card" key={post.id}>
                        <div className="post-header">
                            <img className="post-avatar" src={normalizeAsset(post.user.profile_pic)} alt={post.user.username} />
                            <div className="post-user">
                                {post.user.username}
                                <span className="post-time">• 7h</span>
                            </div>
                            <span className="post-dots">•••</span>
                        </div>

                        <div className="post-media">
                          <div className="poster">
                            <div className="poster-top">
                              <div className="poster-brand">
                                <span className="logo-mini">H</span>
                                <span>HiringHustle</span>
                              </div>
                              <span className="poster-tag">Job Update</span>
                            </div>

                            <div className="poster-title">
                              <span>HEXAWARE</span>
                              <span className="highlight">IS HIRING!</span>
                            </div>

                            <div className="poster-mid">
                              <div className="poster-side">
                                <div className="row-label"><span className="icon-box">⌂</span> Company</div>
                                <span className="value">Hexaware Technologies</span>
                                <div className="row-label"><span className="icon-box">◔</span> Role</div>
                                <span className="value">Gen AI Developer Associate</span>
                                <div className="row-label"><span className="icon-box">◎</span> Location</div>
                                <span className="value">India</span>
                                <div className="row-label"><span className="icon-box">▣</span> Experience</div>
                                <span className="value">0 to 1 year</span>
                              </div>

                              <div className="poster-visual">
                                <span className="brand-mark">HEXAWARE</span>
                              </div>
                            </div>

                            <div className="poster-footer">
                              <div className="action-pill"><strong>★</strong> Key Highlights</div>
                              <div className="action-pill"><strong>▣</strong> Skills</div>
                              <div className="action-pill"><strong>✦</strong> Apply</div>
                            </div>
                          </div>
                        </div>

                        <div className="post-actions" style={{ display: 'flex', gap: '14px', padding: '12px 12px 0', color: '#f7f7f7' }}>
                          <i className="bi bi-heart"></i>
                          <i className="bi bi-chat"></i>
                          <i className="bi bi-send"></i>
                        </div>

                        <div style={{ padding: '8px 12px 14px' }}>
                          <b>{post.likes} Likes</b>
                          <div style={{ marginTop: '6px' }}>
                            <b>{post.caption}</b>
                          </div>
                          <div style={{ color: '#8a96a7', fontSize: '0.8rem', marginTop: 4 }}>
                            {post.comments?.length ?? 0} comments
                          </div>
                        </div>
                    </article>
                ))}
            </div>
        ) : (
            <div>Loading Posts...</div>
        )}
    </div>
  )
}

export default Posts