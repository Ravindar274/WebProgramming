import React, { useContext, useState, useRef } from 'react';
import axios from 'axios';
import '../css/create.css';
import { CurrentPageContext, UserContext } from './Home';
import uploadImgIcon from '../images/picture.png';
import submitImg from '../images/submit.png';
import DialogBox from './DialogBox';

const CreatePost = () => {
  const user = useContext(UserContext);
  const setCurrentPage = useContext(CurrentPageContext);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    formData.append('user', user.username);
    if (fileInputRef.current?.files[0]) {
      formData.append('file', fileInputRef.current.files[0]);
    }

    try {
      const response = await axios.post('http://localhost:5000/create-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setDialogMessage('Post created successfully!');
      setIsDialogOpen(true); // Open the dialog
    } catch (error) {
      setDialogMessage('Failed to upload data and file.');
      setIsDialogOpen(true); // Open the dialog
      console.error('Error creating the post:', error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog
    setCurrentPage('/posts'); // Navigate to '/posts'
  };

  return (
    <div className="create-post-container">
      <div className="create-post-box">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="What's on your mind?"
          className="post-input"
        />
        <div className="imagePreviewDiv">
          {image && <img src={image} alt="Preview" className="image-preview" />}
        </div>
        <div className="action-buttons">
          {!image && <span>Upload Image/Video</span>}
          {!image && (
            <img
              src={uploadImgIcon}
              className="uploadImg"
              onClick={triggerFileInput}
              alt="Upload"
            />
          )}
          <input
            id="upload-image"
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="submit-post-div-main">
        <div className="submit-post-div">
          <img src={submitImg} onClick={handleSubmit} className="submit-post" />
          <span>Post</span>
        </div>
      </div>

      {/* Dialog Box */}
      <DialogBox
        isOpen={isDialogOpen}
        message={dialogMessage}
        onClose={handleDialogClose} // Navigate to '/posts' on close
      />
    </div>
  );
};

export default CreatePost;
