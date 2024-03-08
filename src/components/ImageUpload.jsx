import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import "./ImageUpload.css";

export const ImageUpload = ({ onImageLoad }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const canvasRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        onImageLoad(img, canvas);
      };
    }
  }, [imageSrc]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <canvas ref={canvasRef} className="canvasContainer" />
      {imageSrc && (
        <img src={imageSrc} alt="Uploaded" className="hiddenImage" />
      )}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <label htmlFor="fileInput" className="fileInputLabel">
        <FontAwesomeIcon icon={faFileUpload} /> Upload File
      </label>
    </div>
  );
};
