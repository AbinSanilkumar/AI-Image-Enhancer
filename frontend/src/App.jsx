import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [original, setOriginal] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [loading, setLoading] = useState(false);

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

      setOriginal(
        "http://127.0.0.1:8000" +
          response.data.data.original_image
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
    <div style={{ padding: "30px" }}>
      <h1>AI Image Enhancer</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Enhance Image
      </button>

      {loading && <p>Processing...</p>}

      {original && (
        <>
          <h2>Original</h2>
          <img
            src={original}
            alt=""
            width="300"
          />

          <h2>Enhanced</h2>
          <img
            src={enhanced}
            alt=""
            width="300"
          />

          <br />

          <a
            href={enhanced}
            download
          >
            Download Enhanced Image
          </a>
        </>
      )}
    </div>
  );
}

export default App;