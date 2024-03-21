//react
import { useEffect, useState } from 'react';

//next
import Link from "next/link";

//assets
    //logos
import Example_project from "../assets/projects/Example_project.png";
    //icons
import Chevron_prev_dark from "../assets/icons/chevron_prev_dark.svg";
import Chevron_next_dark from "../assets/icons/chevron_next_dark.svg";
import Chevron_prev_light from "../assets/icons/chevron_prev_light.svg";
import Chevron_next_light from "../assets/icons/chevron_next_light.svg";
import Btn_pagination from "../assets/icons/btn_pagination.svg";
import Btn_pagination__gray from "../assets/icons/btn_pagination__gray.svg";
import Github_link from "../assets/icons/github_link_light.svg";
import Demo_link from "../assets/icons/demo_link_light.svg";

//redux
import { useSelector } from 'react-redux'
interface RootState {
  darkMode: {
      mode: boolean;
  };
}

interface Article {
  type: string;
  name: string;
  github_link: string;
  demo_link: string;
}

interface SliderProps {
  articles: Article[];
}

const SliderProjects = ({ articles }: SliderProps) => {
  const { mode } = useSelector((state: RootState) => state.darkMode);

  const [articlesPerPage, setArticlesPerPage] = useState(6); // Par défaut 6 articles par page
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle

  useEffect(() => {
    const handleResize = () => {
      let newArticlesPerPage = 6;
      if (window.innerWidth >= 1436) {
        newArticlesPerPage = 6;
      } else if (window.innerWidth >= 1180 && window.innerWidth < 1436) {
        newArticlesPerPage = 4;
      } else {
        newArticlesPerPage = 1;
      }

      // Vérifier si la page actuelle dépasse le nombre total de pages après le changement de pagination
      const totalPages = Math.ceil(articles.length / newArticlesPerPage);
      setCurrentPage(Math.min(currentPage, totalPages));

      setArticlesPerPage(newArticlesPerPage);
    };

    // Ajouter un écouteur d'événement pour surveiller les changements de taille de fenêtre
    window.addEventListener('resize', handleResize);

    // Appel initial de handleResize pour ajuster la pagination en fonction de la largeur de l'écran au chargement de la page
    handleResize();

    // Supprimer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [articles, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderPagination = () => {
    const pagination = [];
    for (let i = 0; i < totalPages; i++) {
      pagination.push(
        <button className='btn_pagination' key={i} onClick={() => setCurrentPage(i + 1)}>
          {currentPage === i + 1
            ? 
            <img src={Btn_pagination.src} alt="Bouton actuelle de la pagination" /> 
                : 
            <img src={Btn_pagination__gray.src} alt="Bouton actuelle de la pagination" />}
        </button>
      );
    }
    return pagination;
  };

  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div id='sp'>
      <div id="sliderProjects">
        {currentArticles.map((article, index) => (
          <article key={index} className="project">
            <figure>
              <img className='figure_img' src={Example_project.src} alt="Une icone de la lune" />
              <figcaption>
                <div className='figcaption_type'><h5>{article.type}</h5></div>
                <div className='figcaption_name'><h4>{article.name}</h4></div>
                <div className='figcaption_github_link'>
                  <h5>Github<Link href={article.github_link}><img className='project_figcaption_img' src={Github_link.src} alt="icone du lien github" /></Link></h5>
                </div>
                <div className='figcaption_demo_link'>
                  <h5>Voir Demo<Link href={article.demo_link}><img className='project_figcaption_img' src={Demo_link.src} alt="icone du lien demo" /></Link></h5>
                </div>
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
      <div id='sliderPagination'>
        <button className='chevron_project' id='chevron_project_prev' onClick={handlePrevPage} disabled={currentPage === 1}>
          <img src={mode ? Chevron_prev_light.src : Chevron_prev_dark.src} alt="Chevron precedent" />
        </button>
        {renderPagination()}
        <button className='chevron_project' id='chevron_project_next' onClick={handleNextPage} disabled={currentPage === totalPages}>
          <img src={mode ? Chevron_next_light.src : Chevron_next_dark.src} alt="Chevron suivant" />
        </button>
      </div>
    </div>
  );
};

export default SliderProjects;