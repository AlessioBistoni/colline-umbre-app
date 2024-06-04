import Link from 'next/link';
import Image from 'next/image';
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top align-content-center">
      <div className="container-fluid">
        <div className="navbar-brand mx-auto">
        <div className={styles.logoImageContainer}>
        <Image
              src="/logo.png"
              alt="logo"
              layout="responsive"
              width={100}
              height={100}
              className={styles.imageLogo}
            />
        </div>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className={styles.barra}>
            <li className="nav-item px-3">
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item px-3">
              <Link href="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item px-3">
              <Link href="/contact" className="nav-link">Contact</Link>
            </li>
            <li className="nav-item px-3">
              <Link href="/shop" className="nav-link">Shop</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
