import { useRef, FormEvent, useState } from 'react';


const Form = () => {
  const [validForm, setValidForm] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const objectRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  
  const validateChamp = (champ: HTMLInputElement | HTMLTextAreaElement ) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      if(champ.value === "" && champ.id !== "object") {
        throw new Error(`Le champ ne doit pas etre vide !${champ.id}`)
      }
      else if((champ.id === "name") && champ.value.length < 2  ) {
        throw new Error(`Le nom doit comporter au moins 2 caractères !${champ.id}`)
      }
      else if(champ.id === "email" && regex.test(champ.value) === false) {
        throw new Error(`Veuillez remplir correctement votre e-mail !${champ.id}`)
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
  const AfficheMessageErreur = (erreur: string) => {
    const phrase = `${erreur.split('!')[0]}`
    const balise = document.getElementById(`${erreur.split('!')[1]}`);
    if (balise && balise.parentNode instanceof HTMLElement) {
      balise.dataset.errorVisible = 'true';
      balise.parentNode.dataset.error = phrase;

    } else {
      console.error('Erreur : balise.parentNode est null ou n\'est pas un HTMLElement');
    }
  }

  /**
 * Cette fonction permet de supprimer le message d'erreur
 */
const SupprimeMessageErreur = (erreur: string) => {
  const balise = document.getElementById(`${erreur}`)
  if (balise && balise.parentNode instanceof HTMLElement) {
    delete balise.dataset.errorVisible
    delete balise.parentNode.dataset.error
  } else {
    console.error('Erreur : balise.parentNode est null ou n\'est pas un HTMLElement');
  }
}


  /**
 * Cette fonction permet de gerer le formulaire
 */
  const gererFormulaire = () => {
    const nameElement = nameRef.current as unknown as HTMLInputElement | HTMLTextAreaElement;
    const emailElement = emailRef.current as unknown as HTMLInputElement | HTMLTextAreaElement;
    const objectElement = objectRef.current as unknown as HTMLInputElement | HTMLTextAreaElement;
    const msgElement = msgRef.current as unknown as HTMLInputElement | HTMLTextAreaElement;

    if ((nameElement !== null) && (emailElement !== null) && (objectElement !== null) && (msgElement !== null)) {
      SupprimeMessageErreur(`${nameElement.id}`)
      SupprimeMessageErreur(`${emailElement.id}`)
      SupprimeMessageErreur(`${objectElement.id}`)
      SupprimeMessageErreur(`${msgElement.id}`)
    }
    
    if (nameElement !== null) {
      validateChamp(nameElement);
    }
  
    
    if (emailElement !== null) {
      validateChamp(emailElement);
    }
  
    
    if (objectElement !== null) {
      validateChamp(objectElement);
    }
  
    
    if (msgElement !== null) {
      validateChamp(msgElement);
    }
  }

/**
 * Cette fonction permet de récupérer et valider les informations dans le formulaire
 */
const validate = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    gererFormulaire();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const object = objectRef.current?.value;
    const message = msgRef.current?.value;

    const response = await fetch('https://raw.githubusercontent.com/bdioubate/portfolio/main/src/app/api/route.ts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, object, message }),
    });

    if (response.ok) {
      setValidForm(true);
      setTimeout(() => {
        setValidForm(false);
        if (nameRef.current) nameRef.current.value = '';
        if (emailRef.current) emailRef.current.value = '';
        if (objectRef.current) objectRef.current.value = '';
        if (msgRef.current) msgRef.current.value = '';
      }, 5000);
    } else {
      console.error('Failed to send email:', response.statusText);
    }
  } catch (error: any) {
    AfficheMessageErreur(error.message)
    console.error('Error sending email:', error);
  }
};

  return (
    <div id='formulaire'>
      <form
      method="post"
      onSubmit={validate}
      style={{ display: validForm === false ? "flex" : "none" }} 
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
      <div id="message-form" style={{ display: validForm === false ? "none" : "flex" }}>
        <h3>Message envoyé !</h3>
      </div>
    </div>
    
  );
};

export default Form;