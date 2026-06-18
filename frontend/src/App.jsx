import { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/upload/",
      formData
    );

    console.log(response.data);
  };

  return (
    <div>
      <h1>AI Image Enhancer</h1>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={uploadImage}>
        Upload
      </button>
    </div>
  )
}

export default App
