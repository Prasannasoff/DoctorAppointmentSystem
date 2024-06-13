// ImageUpload.js
import React, { useState } from 'react';

const ImageUpload = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      onImageSelect(file); // Pass the selected file to the parent component
      setPreviewUrl(URL.createObjectURL(file));
      setShowPreview(true); // Show preview when an image is selected
    } else {
      // Clear the selected image and preview if no image is selected
      setSelectedImage(null);
      onImageSelect(null); // Pass null to indicate no image selected
      setPreviewUrl(null);
      setShowPreview(false);
    }
  };

  const handlePreviewClick = () => {
    setShowPreview(true);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && <button onClick={handlePreviewClick}>Preview</button>}
      {showPreview && previewUrl && (
        <div>
          <img src={previewUrl} alt="Image Preview" style={{ width: '300px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
