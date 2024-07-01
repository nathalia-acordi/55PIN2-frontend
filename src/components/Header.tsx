import "./Header.css";
import { Person2, Notifications } from "@mui/icons-material";
import CarregaLivrosPesquisados from "./Pesquisa/index.js";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <img
        src="/LiteraLogo2.png"
        alt="Litera Logo"
        className="logobanner"
        onClick={() => navigate("/")}
      />
      <nav className="nav">
        <CarregaLivrosPesquisados />
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
