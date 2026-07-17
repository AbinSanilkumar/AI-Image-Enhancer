import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UploadBox from "../components/UploadBox";
import Features from "../components/Features";
import ImageComparison from "../components/ImageComparison";

// Read backend URL from Vercel environment variable
const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL =", API_URL);

function Home() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [resolution, setResolution] = useState("");
  const [original, setOriginal] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setFile(null);
    setOriginal("");
    setEnhanced("");

    setFileName("");
    setFileSize("");
    setResolution("");
  };

  const handleDownload = () => {
    const link = document.createElement("a");

    link.href = enhanced;
    link.download = "enhanced-image.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/upload/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEnhanced(
        `${API_URL}${response.data.data.enhanced_image}`
      );

    } catch (error) {
      console.error("Upload failed:", error);

      if (error.response) {
        console.error(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="home-container">

        <h1 className="title">
          AI Image Enhancer
        </h1>

        <p className="subtitle">
          Transform low-resolution and blurry images into sharp,
          high-quality visuals using the power of Real-ESRGAN deep learning.
        </p>

        <UploadBox
          loading={loading}
          onChange={(e) => {

            const selectedFile = e.target.files[0];

            if (!selectedFile) return;

            setFile(selectedFile);

            setFileName(selectedFile.name);

            setFileSize(
              (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB"
            );

            const img = new Image();

            img.onload = () => {
              setResolution(
                `${img.width} × ${img.height}`
              );
            };

            img.src = URL.createObjectURL(selectedFile);

            setOriginal(
              URL.createObjectURL(selectedFile)
            );

            setEnhanced("");

          }}
        >
          {file && (
            <div className="file-info">

              <h3>Selected Image</h3>

              <p><strong>Name:</strong> {fileName}</p>

              <p><strong>Size:</strong> {fileSize}</p>

              <p><strong>Resolution:</strong> {resolution}</p>

            </div>
          )}
        </UploadBox>

        <button
          className="enhance-btn"
          onClick={handleUpload}
          disabled={!file || loading}
        >
          {loading ? "Enhancing..." : "Enhance Image"}
        </button>

        {loading && (
          <div className="loader-container">
            <div className="loader"></div>

            <p className="loading-text">
              Enhancing your image...
            </p>

            <small>
              This may take a few moments.
            </small>
          </div>
        )}

        {original && enhanced && (
          <>
            <ImageComparison
              original={original}
              enhanced={enhanced}
            />

            <div className="button-group">

              <button
                className="download-btn"
                onClick={handleDownload}
              >
                Download HD Image
              </button>

              <button
                className="reset-btn"
                onClick={handleReset}
              >
                Enhance Another Image
              </button>

            </div>
          </>
        )}

        <Features />

      </div>

      <Footer />
    </>
  );
}

export default Home;