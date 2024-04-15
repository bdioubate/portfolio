import { useRef, FormEvent } from 'react';

const Form = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const objectRef = useRef(null);
  const msgRef = useRef(null);

  const validateChamp = (champ: HTMLInputElement | HTMLTextAreaElement ) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      if(champ.value === "") {
        throw new Error(`Le champ ne doit pas etre vide !${champ.id}`)
      }
      else if((champ.id === "name") && champ.value.length < 2  ) {
        throw new Error(`Le nom doit comporter au moins 2 caractères !${champ.id}`)
      }
      else if(champ.id === "email" && regex.test(champ.value) === false) {
        throw new Error(`Veuillez remplir correctement votre e-mail !${champ.id}`)
      }
      else if((champ.id === "object") && champ.value.length < 2  ) {
        throw new Error(`L'objet doit comporter au moins 2 caractères !${champ.id}`)
      }
      else if((champ.id === "msg") && champ.value.length < 10  ) {
        throw new Error(`Le message doit comporter au moins 10 caractères !${champ.id}`)
      }
      else {
        SupprimeMessageErreur(`${champ.id}`)
      }
  }

  /**
 * Cette fonction permet d'afficher le message d'erreur
 */
  function AfficheMessageErreur(erreur: string) {
    let balise = document.getElementById(`${erreur.split('!')[1]}`);
    if (balise && balise.parentNode instanceof HTMLElement) {
      //balise.parentNode.dataset.errorVisible = 'true';
      //balise.parentNode.dataset.error = `${erreur.split('!')[0]}`
      balise.style.border = '2px solid red'; 
    } else {
      console.error('Erreur : balise.parentNode est null ou n\'est pas un HTMLElement');
    }
  }

  /**
 * Cette fonction permet de supprimer le message d'erreur
 */
function SupprimeMessageErreur(erreur: string) {
  let balise = document.getElementById(`${erreur}`)
  if (balise && balise.parentNode instanceof HTMLElement) {
    //balise.parentNode.dataset.errorVisible = 'true';
    //balise.parentNode.dataset.error = `${erreur.split('!')[0]}`
    balise.style.border = ''; 
  } else {
    console.error('Erreur : balise.parentNode est null ou n\'est pas un HTMLElement');
  }
}


  /**
 * Cette fonction permet de gerer le formulaire
 */
  function gererFormulaire() {

    const nameElement = nameRef.current as unknown as HTMLInputElement | HTMLTextAreaElement;
    if (nameElement !== null) {
      validateChamp(nameElement);
    }
  
    const emailElement = emailRef.current as unknown as HTMLInputElement | HTMLTextAreaElement;
    if (emailElement !== null) {
      validateChamp(emailElement);
    }
  
    const objectElement = objectRef.current as unknown as HTMLInputElement | HTMLTextAreaElement;
    if (objectElement !== null) {
      validateChamp(objectElement);
    }
  
    const msgElement = msgRef.current as unknown as HTMLInputElement | HTMLTextAreaElement;
    if (msgElement !== null) {
      validateChamp(msgElement);
    }
  }

/**
 * Cette fonction permet de récupérer et valider les informations dans le formulaire
 */
const validate = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    gererFormulaire()
  } catch(error) {
    if (error instanceof Error) {
      console.log(`${error.message.split('!')[1]}`);
      console.error(`${error.message.split('!')[0]}`);
      AfficheMessageErreur(error.message);
    } else {
      console.log("pas attraper")
    }
    return false
  }
  
  return true
}

  return (
    <form
      method="post"
      onSubmit={validate}
    >
      <ul>
        <li className="li50">
          <label htmlFor="name"></label>
          <input 
            className="text-control"
            type="text" 
            id="name" 
            name="user_name" 
            placeholder="Nom*"
            ref={nameRef} 
          />
        </li>
        <li className="li50">
          <label htmlFor="mail"></label>
          <input 
            className="text-control"
            type="email" 
            id="mail" 
            name="user_mail" 
            placeholder="E-mail*"
            ref={emailRef}
          />
        </li>
        <li className="li100">
          <label htmlFor="object"></label>
          <input 
            type="text"  
            id="object" 
            name="user_object" 
            placeholder="Objet"
            ref={objectRef}
          />
        </li>
        <li className="li100">
          <label htmlFor="msg"></label>
          <textarea 
            className="text-control"
            id="msg" 
            name="user_message" 
            placeholder="Message*" 
            ref={msgRef}
          ></textarea>
        </li>
      </ul>
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default Form;

/**
 * Ajouter les message d'erreur en dessous des div champ et de les supprimer
 */