import Link from "next/link";

const Header = () => {

  return (
    <header id="header">
      <div id="header__name">
        <h3>Bangali DIOUBATE</h3>
      </div>
      <div id="header__nav">
        <nav>
          <Link href="#profile">Profil</Link>
          <Link href="#about">À propos</Link>
          <Link href="#projects">Projets</Link>
          <Link href="#contact">Contact</Link>
        </nav>
        </div>
    </header>
  );
};

export default Header;