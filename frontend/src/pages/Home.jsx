import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UploadBox from "../components/UploadBox";
import Features from "../components/Features";
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
          onChange={handleFileChange}
        />

        <Features />

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

      <Footer />
    </>
  );
}

export default Home;