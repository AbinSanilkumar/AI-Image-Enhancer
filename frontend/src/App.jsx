import { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/upload/",
      formData
    );

    setResult(response.data);
  };

  return (
    <div>
      <h1>AI Image Enhancer</h1>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={uploadImage}>
        Enhance Image
      </button>

      {result && (
        <div>
          <h3>Enhanced Image</h3>

          <img
            src={`http://127.0.0.1:8000${result.enhanced_image}`}
            width="400"
          />
        </div>
      )}
    </div>
  )
}

export default App
