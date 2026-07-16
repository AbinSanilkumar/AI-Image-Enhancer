import { FaCloudUploadAlt } from "react-icons/fa";

function UploadBox({ onChange, loading, children }) {
  return (
    <label className="upload-box">
      <FaCloudUploadAlt size={70} />

      <h2>Drag & Drop Image</h2>

      <p>
        or click anywhere to browse
      </p>

      <small>
        PNG • JPG • JPEG
        <br />
        Maximum file size: 10 MB
      </small>

      <input
        type="file"
        hidden
        disabled={loading}
        onChange={onChange}
      />

      {children}
    </label>
  );
}

export default UploadBox;