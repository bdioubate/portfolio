import Image from 'next/image';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../GlobalRedux/redux";
import moonIcon from "../assets/icons/moon.svg";
import sunIcon from "../assets/icons/sun.svg";

interface ToggleDarkModeProps {}

const DarkModeToggle = ({}: ToggleDarkModeProps) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<boolean>(false);

  const handleToggleDarkMode = () => {
    const newMode = !mode;
    setMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    dispatch(toggleDarkMode()); 
  };

  return (
    <button id="dark_mode" onClick={handleToggleDarkMode}>
      <Image fill={true} src={ mode ? sunIcon.src : moonIcon.src} alt="L'icone du darkmode" /> 
    </button> 
  );
};

export default DarkModeToggle;