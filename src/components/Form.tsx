
const Form = () => {
  return (
    <form
      method="get"
    >
      <ul>
        <li className="li50">
          <label htmlFor="name"></label>
          <input type="text" id="name" name="user_name" placeholder="Nom*" required />
        </li>
        <li className="li50">
          <label htmlFor="mail"></label>
          <input type="email" id="mail" name="user_mail" placeholder="E-mail*" required />
        </li>
        <li className="li100">
          <label htmlFor="object"></label>
          <input type="text" id="object" name="user_object" placeholder="Objet" />
        </li>
        <li className="li100">
          <label htmlFor="msg"></label>
          <textarea id="msg" name="user_message" placeholder="Message*" required></textarea>
        </li>
      </ul>
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default Form;