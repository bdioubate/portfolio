'use client'
//next
import Link from "next/link";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Image from 'next/image';

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
  //data
//Project
import projectlist from "../data/projects.json"


//Components
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Form from "../components/Form";
import SliderProjects from "../components/SliderProjects";

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
      <body className={inter.className}>
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
                <Image src={linkedinLogo.src} alt="Logo LinkedInd" />
                <Image src={githubLogo.src} alt="Logo GitHub" />
              </div>
            </div>
            <div id="profile__img">
              <Image src={mode ? profileImgDark.src : profileImgLight.src } alt="La photo de profil de Bangali DIOUBATE" />
            </div>
          </section>
          <section id="about">
            <div className="section-title">
              <h2>A PROPOS</h2>
            </div>
            <div id="about__main">
              <div id="about__main__presentation">
                <p>En tant que développeur web passionné par les dernières technologies de l&apos;information et de la communication, 
                j&apos;ai acquis une grande expertise dans la conception et le développement de sites web modernes et dynamiques.</p>
              </div>
              <div id="about__main__information">
                <button>Telecharger mon CV</button>
                <div id="about__main__information__skills">
                  <Image src={html5Logos.src} alt="Logo HTML5" />
                  <Image src={css3Logos.src} alt="Logo CSS3" />
                  <Image src={jsLogos.src} alt="Logo Javascript" />
                  <Image src={gitLogos.src} alt="Logo Git" />
                  <Image src={githubLogos.src} alt="Logo GitHub" />
                  <Image src={reactLogos.src} alt="Logo React" />
                  <Image src={pythonLogos.src} alt="Logo Python" />
                  <Image src={javaLogos.src} alt="Logo Java" />
                </div>
              </div>
            </div>
          </section>
          <section id="projects">
            <div className="section-title">
              <h2>PROJETS</h2>
            </div>
            <SliderProjects
              articles={projectlist}
            />
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
