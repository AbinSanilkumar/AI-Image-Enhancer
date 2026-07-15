import { useState } from "react";
import axios from "axios";

import UploadBox from "../components/UploadBox";
import ImageComparison from "../components/ImageComparison";
import Loader from "../components/Loader";

function Home() {
  const [file, setFile] = useState(null);
  const [original, setOriginal] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    if (e.target.files[0]) {
      setOriginal(
        URL.createObjectURL(e.target.files[0])
      );
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData
      );

      setEnhanced(
        "http://127.0.0.1:8000" +
        response.data.data.enhanced_image
      );

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="home-container">

      <h1 className="title">
        AI Image Enhancer
      </h1>

      <p className="subtitle">
        Enhance blurry images using Real-ESRGAN AI
      </p>

      <UploadBox
        onChange={handleFileChange}
      />

      {file && (
        <button
          className="enhance-btn"
          onClick={handleUpload}
        >
          Enhance Image
        </button>
      )}

      {loading && <Loader />}

      {original && enhanced && (
        <>
          <ImageComparison
            original={original}
            enhanced={enhanced}
          />

          <a
            href={enhanced}
            target="_blank"
            rel="noreferrer"
            className="download-btn"
          >
            Download HD Image
          </a>
        </>
      )}

    </div>
  );
}

export default Home;