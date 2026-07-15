import { FaCloudUploadAlt } from "react-icons/fa";

function UploadBox({ onChange }) {
  return (
    <label className="upload-box">
      <FaCloudUploadAlt size={50} />

      <h3>Upload Image</h3>

      <p>Drag & Drop or Click Here</p>

      <input
        type="file"
        hidden
        onChange={onChange}
      />
    </label>
  );
}

export default UploadBox;