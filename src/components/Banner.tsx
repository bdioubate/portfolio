//next
import Link from "next/link";
import Image from 'next/image';

//react
import { useEffect } from 'react';

//components
import DarkModeToggle from "../components/DarkModeToggle";

//assets 
  //icons
import CloseMenuDark from "../assets/icons/close_menu_light.svg"
import CloseMenuLight from "../assets/icons/close_menu_light.svg"
import BurgerBarDark from "../assets/icons/burger_bar_dark.svg";
import BurgerBarLight from "../assets/icons/burger_bar_light.svg"

//redux
import { useSelector } from 'react-redux'
interface RootState {
  darkMode: {
      mode: boolean;
  };
}

const Header = () => {

  useEffect(() => {
    const handleResize = () => {
      const navElement = document.querySelector("#header__nav nav") as HTMLElement;
      if (window.innerWidth > 700) {
        navElement.style.display = 'flex';
      } else if (window.innerWidth <= 700) {
        navElement.style.display = 'none';
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  const { mode } = useSelector((state: RootState) => state.darkMode);

  const closeMenu = () => {
    const navElement = document.querySelector("#header__nav nav");
    if (navElement instanceof HTMLElement) {
      navElement.style.display = (navElement.style.display === 'none') ? 'flex' : 'none';
    }
  };

  const displayMenu = () => {
    const navElement = document.querySelector("#header__nav nav");
    if (navElement instanceof HTMLElement) {
      navElement.style.display = (navElement.style.display === 'flex') ? 'none' : 'flex';
    }
};

  return (
    <header id="header">
      <div id="header__name">
        <h3>Bangali DIOUBATE</h3>
      </div>
      <div id="header__nav">
        <nav>
          <button id="close_menu" onClick={closeMenu}>
            <Image fill={true} src={ mode ? CloseMenuLight.src : CloseMenuDark.src} alt="L'icone close du menu" />
          </button>
          <Link href="#profile">Profil</Link>
          <Link href="#about">À propos</Link>
          <Link href="#projects">Projets</Link>
          <Link href="#contact">Contact</Link>
        </nav>
        <button id="display_menu" onClick={displayMenu}>
          <Image fill={true} src={ mode ? BurgerBarLight.src : BurgerBarDark.src} alt="L'icone du burger bar" /> 
        </button>
        <DarkModeToggle />
        </div>
    </header>
  );
};

export default Header;