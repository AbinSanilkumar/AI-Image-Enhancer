function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        AI Image Enhancer
      </div>

      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li>
          <a
            href="https://github.com/AbinSanilkumar/AI-Image-Enhancer"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;