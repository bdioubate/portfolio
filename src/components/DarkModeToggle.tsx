import Image from 'next/image';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../GlobalRedux/redux";
import moonIcon from "../assets/icons/moon.svg";
import sunIcon from "../assets/icons/sun.svg";

interface ToggleDarkModeProps {}

//redux
import { useSelector } from 'react-redux'
interface RootState {
  darkMode: {
      mode: boolean;
  };
}

const DarkModeToggle = ({}: ToggleDarkModeProps) => {
  const { mode } = useSelector((state: RootState) => state.darkMode);
  const dispatch = useDispatch();
  const [mode1, setMode1] = useState<boolean>(false);

  const handleToggleDarkMode = () => {
    const newMode1 = !mode1;
    setMode1(newMode1);
    localStorage.setItem("darkMode", JSON.stringify(newMode1));
    dispatch(toggleDarkMode()); 
  };

  return (
    <button id="dark_mode" onClick={handleToggleDarkMode}>
      <Image fill={true} src={ mode1 ? sunIcon.src : moonIcon.src} alt="L'icone du darkmode" /> 
    </button> 
  );
};

export default DarkModeToggle;