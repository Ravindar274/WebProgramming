import React, { useEffect, useState } from 'react';
import picture1 from '../images/beautiful.jpg';
import picture2 from '../images/toronto.png';
import picture3 from '../images/jennifer.png';
import picture4 from '../images/post-pic.jpg';
import '../css/saved.css'; // Separate CSS for styling

function Saved() {
  const [selectedPicture, setSelectedPicture] = useState(null); // To track clicked picture

  const savedPicturesList = [
    { id: 1, src: picture1, caption: 'Sunset at Park' },
    { id: 2, src: picture2, caption: 'Toronto View' },
    { id: 3, src: picture3, caption: 'Jennifer' },
    { id: 4, src: picture4, caption: 'Tech Workspace' },
  ];

  const handleImageClick = (picture) => {
    setSelectedPicture(picture); // Set the selected picture to display in modal
  };

  const closeModal = () => {
    setSelectedPicture(null); // Close the modal
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="saved-pictures-container">
      <h2 className="saved-pictures-title">Saved Pictures</h2>
      <div className="saved-pictures-grid">
        {savedPicturesList.map((picture) => (
          <div key={picture.id} className="saved-picture-item">
            <img
              src={picture.src}
              alt={picture.caption}
              className="saved-picture-img"
              onClick={() => handleImageClick(picture)} // Handle image click
            />
            <p className="saved-picture-caption">{picture.caption}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPicture && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              &times;
            </button>
            <img
              src={selectedPicture.src}
              alt={selectedPicture.caption}
              className="modal-image"
            />
            <p className="modal-caption">{selectedPicture.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Saved;
