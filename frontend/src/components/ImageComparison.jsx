function ImageComparison({
  original,
  enhanced
}) {
  return (
    <div className="comparison-container">

      <div>
        <h2>Original</h2>

        <img
          src={original}
          alt="original"
        />
      </div>

      <div>
        <h2>Enhanced</h2>

        <img
          src={enhanced}
          alt="enhanced"
        />
      </div>

    </div>
  );
}

export default ImageComparison;