import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/posts.css';
import '../css/loader.css';
import avatar1 from '../images/avatar1.png'; // Adjust the path if needed
import likeIcon from '../images/heart.png'; // Adjust the path if needed
import commentIcon from '../images/comment.png'; // Adjust the path if needed
import shareIcon from '../images/share.png'; // Adjust the path if needed

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 

  // Function to fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fetch-posts');
      setPosts(response.data); // Set the API data to state
      console.log('response.data ::  ', response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }  finally {
      setLoading(false); // Hide loader after posts are fetched
    }
  };

  useEffect(() => {
    fetchPosts(); // Call the API when component mounts
  }, []);

  return (
    <div className="posts-container">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        posts.map((post, index) => (
          <div key={index} className="post">
            {/* Header */}
            <div className="post-header">
              <img src={avatar1} alt="User Avatar" className="avatar" />
              <div className="user-info">
                <h4 className="username">{post.userName}</h4>
                <p className="post-time">{new Date(post.postDate).toLocaleString()}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="post-content">
              {post.postData && (
                <img
                  src={`data:image/jpeg;base64,${post.postData}`}
                  alt="Post"
                  className="posted-image"
                />
              )}
              <p className="post-text">{post.postText}</p>
            </div>

            {/* Actions */}
            <div className="post-actions">
              <img className="action-button-icon" src={likeIcon} alt="Like" />
              <img className="action-button-icon" src={commentIcon} alt="Comment" />
              <img className="action-button-icon" src={shareIcon} alt="Share" />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Posts;
