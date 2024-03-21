'use client'
//next
import Link from "next/link";

//assets
  //profiles
import profileImgLight from "../assets/profiles/profile_light.svg";
import profileImgDark from "../assets/profiles/profile_dark.svg";
  //logos
import linkedinLogo from "../assets/logos/linkedin.svg";
import githubLogo from "../assets/logos/github.svg";
import html5Logos from "../assets/logos/html5.svg";
import css3Logos from "../assets/logos/css3.svg";
import jsLogos from "../assets/logos/js.svg";
import reactLogos from "../assets/logos/react.svg";
import gitLogos from "../assets/logos/git.svg";
import githubLogos from "../assets/logos/github.svg";
import pythonLogos from "../assets/logos/python.svg";
import javaLogos from "../assets/logos/java.svg";

//Components
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Form from "../components/Form";

//redux
import { useSelector } from 'react-redux'
interface RootState {
  darkMode: {
      mode: boolean;
  };
}


export default function Home() {

  const { mode } = useSelector((state: RootState) => state.darkMode);

  return (
    <html lang="fr" className={mode ? 'dark-mode' : 'light-mode'}>
      <body>
        <Banner />
        <main>
          <div id="wrapper">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <section id="profile"> 
            <div id="profile__information">
              <h1>Développeur informatique</h1>
              <button>
                <Link href="#contact">Me Contacter</Link>
              </button>
              <div id="iconsFooter">
                <img src={linkedinLogo.src} alt="Logo LinkedInd" />
                <img src={githubLogo.src} alt="Logo GitHub" />
              </div>
            </div>
            <div id="profile__img">
            <img src={profileImgDark.src} alt="La photo de profil de Bangali DIOUBATE" />
            </div>
          </section>
          <section id="about">
            <div className="section-title">
              <h2>A PROPOS</h2>
            </div>
            <div id="about__main">
              <div id="about__main__presentation">
                <p>En tant que développeur web passionné par les dernières technologies de l'information et de la communication, 
                j'ai acquis une grande expertise dans la conception et le développement de sites web modernes et dynamiques.</p>
              </div>
              <div id="about__main__information">
                <button>Telecharger mon CV</button>
                <div id="about__main__information__skills">
                  <img src={html5Logos.src} alt="Logo HTML5" />
                  <img src={css3Logos.src} alt="Logo CSS3" />
                  <img src={jsLogos.src} alt="Logo Javascript" />
                  <img src={gitLogos.src} alt="Logo Git" />
                  <img src={githubLogos.src} alt="Logo GitHub" />
                  <img src={reactLogos.src} alt="Logo React" />
                  <img src={pythonLogos.src} alt="Logo Python" />
                  <img src={javaLogos.src} alt="Logo Java" />
                </div>
              </div>
            </div>
          </section>
          <section id="projects">
            <div className="section-title">
              <h2>PROJETS</h2>
            </div>
          </section>
          <section id="contact">
            <div className="section-title">
              <h2>CONTACT</h2>
            </div>
            <Form />
          </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
