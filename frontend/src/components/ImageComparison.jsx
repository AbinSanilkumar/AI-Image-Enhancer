function ImageComparison({
  original,
  enhanced
}) {
  return (
    <div className="comparison-container">

      <div className="image-card">
        <h3>Original Image</h3>

        <img
          src={original}
          alt="Original"
        />
      </div>

      <div className="image-card">
        <h3>Enhanced Image</h3>

        <img
          src={enhanced}
          alt="Enhanced"
        />
      </div>

    </div>
  );
}

export default ImageComparison;