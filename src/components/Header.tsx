import "./Header.css";
import { Search, Person2, Notifications } from "@mui/icons-material";
import CarregaLivrosPesquisados from "./Pesquisa/index.js"

function Header() {
  return (
    <header className="header">
      <img src="/LiteraLogo2.png" alt="Litera Logo" className="logobanner" />
      <nav className="nav">
      <CarregaLivrosPesquisados/>
        <ul className="nav-list">
          <li>
            <Person2 htmlColor="#000" />
            <a href="/profile">Meu perfil</a>
          </li>
          <li>
            <Notifications htmlColor="#000" />
            <a href="/notifications">Notificações</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
