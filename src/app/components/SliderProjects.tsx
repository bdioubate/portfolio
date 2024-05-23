import { useEffect, useState } from 'react'; 
import Link from "next/link";
import Image from 'next/image';

import Example_project from "../assets/projects/Example_project.png";
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
  id: number;
  type: string;
  name: string;
  github_link: string;
  demo_link: string;
  image_src: string;
}

interface SliderProps {
  articles: Article[];
}

const SliderProjects: React.FC<SliderProps> = ({ articles }) => {
  const { mode } = useSelector((state: RootState) => state.darkMode);

  const [articlesPerPage, setArticlesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

      const totalPages = Math.ceil(articles.length / newArticlesPerPage);
      setCurrentPage(Math.min(currentPage, totalPages));

      setArticlesPerPage(newArticlesPerPage);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [articles, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
        setIsTransitioning(false);
      }, 400);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        setIsTransitioning(false);
      }, 400);
    }
  };

  const handlePaginationClick = (pageNumber: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setIsTransitioning(false);
    }, 400);
  };

  const renderPagination = () => {
    const pagination = [];
    for (let i = 0; i < totalPages; i++) {
      pagination.push(
        <button className='btn_pagination' key={i} onClick={() => handlePaginationClick(i + 1)}>
          {currentPage === i + 1
            ? <Image width={20} height={20} src={Btn_pagination.src} alt="Bouton actuelle de la pagination" /> 
            : <Image width={20} height={20} src={Btn_pagination__gray.src} alt="Bouton actuelle de la pagination" />}
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
      <div id="sliderProjects" className={isTransitioning ? 'transition' : ''}>
        {currentArticles.map((article, index) => (
          <article key={index} className="project">
            <figure>
              <Image width={400} height={280} className='figure_img' src={article.image_src} alt="Image du site" />
              <figcaption>
                <div className='figcaption_type'><h5>{article.type}</h5></div>
                <div className='figcaption_name'><h4>{article.name}</h4></div>
                <div className='figcaption_github_link'>
                  <h5>Github<Link href={article.github_link}><Image width={40} height={40} className='project_figcaption_img' src={Github_link.src} alt="icone du lien github" /></Link></h5>
                </div>
                <div className='figcaption_demo_link'>
                  <h5>Voir Demo<Link href={article.demo_link}><Image width={40} height={40} className='project_figcaption_img' src={Demo_link.src} alt="icone du lien demo" /></Link></h5>
                </div>
              </figcaption>
            </figure>
            <p>{article.id}</p>
          </article>
        ))}
      </div>
      <div id='sliderPagination'>
        <button className='chevron_project' id='chevron_project_prev' onClick={handlePrevPage} disabled={currentPage === 1}>
          <Image width={80} height={80} src={mode ? Chevron_prev_light.src : Chevron_prev_dark.src} alt="Chevron precedent" style={{ opacity: currentPage === 1 ? 0.4 : 1 }} />
        </button>
        {renderPagination()}
        <button className='chevron_project' id='chevron_project_next' onClick={handleNextPage} disabled={currentPage === totalPages}>
          <Image width={80} height={80} src={mode ? Chevron_next_light.src : Chevron_next_dark.src} alt="Chevron suivant" style={{ opacity: currentPage === totalPages ? 0.4 : 1 }} />
        </button>
      </div>
    </div>
  );
};

export default SliderProjects;
