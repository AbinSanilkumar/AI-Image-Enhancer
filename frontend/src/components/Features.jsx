import { FaBolt, FaImage, FaDownload } from "react-icons/fa";

function Features() {
  return (
    <section id="features" className="features">

      <h2>Features</h2>

      <div className="feature-grid">

        <div className="feature-card">
          <FaBolt size={35} />
          <h3>AI Upscaling</h3>
          <p>
            Restore blurry and low-resolution images using the
            Real-ESRGAN deep learning model.
          </p>
        </div>

        <div className="feature-card">
          <FaImage size={35} />
          <h3>High Quality Output</h3>
          <p>
            Produce sharper images with improved details while
            preserving natural textures.
          </p>
        </div>

        <div className="feature-card">
          <FaDownload size={35} />
          <h3>Instant Download</h3>
          <p>
            Download the enhanced image immediately after
            processing.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;