import styled from "styled-components";
import ContainerInputWrap from "../ContainerInputWrap";
import { useState } from "react";
import ContainerLoginForm from "../ContainerLoginForm";
import { useNavigate } from "react-router-dom";

const ContainerMensagens = styled.div`
  background-color: #f8d7da; /* Cor de fundo vermelha clara */
  color: #721c24; /* Cor do texto vermelho escuro */
  border: 1px solid #f5c6cb; /* Borda vermelha clara */
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const ContainerMensagensSucesso = styled.div`
  background-color: #d4edda; /* Cor de fundo verde clara */
  color: #155724; /* Cor do texto verde escuro */
  border: 1px solid #c3e6cb; /* Borda verde clara */
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const isValidDate = (dateString) => {
  // Verifica se a data está no formato YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  // Verifica se a data é inválida
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return false;
  }

  // Verifica se o ano está dentro do intervalo aceitável
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return false;
  }

  // Verifica se a data não é maior do que a data atual
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas a data
  if (date > today) {
    return false;
  }

  return true;
};

function ContainerInputCadastro() {
  const [email, setEmail] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  function limparCampos() {
    setEmail("");
    setNomeCompleto("");
    setNomeUsuario("");
    setDataNascimento("");
    setSenha("");
    setConfirmacaoSenha("");
  }

  const verificaExisteNomeUsuarioCadastrado = async () => {
    if (nomeUsuario) {
      try {
        const response = await fetch(
          `http://localhost:8083/api/livros/verificar-nome-usuario?nomeUsuario=${nomeUsuario}`
        );
        const exists = await response.json();
        return exists;
      } catch (error) {
        console.error("Erro ao verificar nome de usuário", error);
        return false;
      }
    }
  };

  async function verificaExisteEmailCadastrado() {
    if (email) {
      try {
        const response = await fetch(
          `http://localhost:8083/api/livros/verificar-email-usuario?email=${email}`
        );
        const exists = await response.json();
        return exists;
      } catch (error) {
        console.error("Erro ao verificar e-mail de usuário", error);
        return false;
      }
    }
    return false;
  }

  const validate = async () => {
    const errors = [];
    const usuarioExistente = await verificaExisteNomeUsuarioCadastrado();
    const emailExistente = await verificaExisteEmailCadastrado();

    if (!nomeCompleto) errors.push("Nome completo é obrigatório");
    if (!nomeUsuario) errors.push("Nome de usuário é obrigatório");
    if (!dataNascimento) errors.push("Data de nascimento é obrigatória");
    if (!isValidDate(dataNascimento))
      errors.push("Data de nascimento inválida");
    if (!email) errors.push("E-mail é obrigatório");
    if (!senha) errors.push("Senha é obrigatória");
    if (senha !== confirmacaoSenha)
      errors.push(
        "As senhas informadas não coincidem. Por favor, verifique e insira as senhas novamente"
      );
    if (usuarioExistente)
      errors.push(
        "O nome de usuário informado já está em uso. Por favor, escolha um nome de usuário diferente"
      );
    if (emailExistente) errors.push("O E-mail informado já está cadastrado");

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const ErrorMessages = ({ errors = {} }) => {
    return (
      <ContainerMensagens>
        {Object.keys(errors).map((key, index) => (
          <p key={index} className="error-message">
            {errors[key]}
          </p>
        ))}
      </ContainerMensagens>
    );
  };

  const handleSubmit = async (e) => {
    setSuccessMessage("");
    e.preventDefault();
    const isValid = await validate();
    if (isValid) {
      const userData = {
        nomeCompleto,
        nomeUsuario,
        dataNascimento,
        email,
        senha,
      };

      try {
        const response = await fetch(
          "http://localhost:8083/api/livros/cadastrar/usuario",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        if (!response.ok) {
          throw new Error("Erro ao cadastrar usuário");
        }

        setSuccessMessage("Usuário cadastrado com sucesso");
        localStorage.setItem("logged", "true");
        navigate("/");
        limparCampos();
      } catch (error) {
        console.error("Erro ao cadastrar usuário", error);
      }
    } else {
      console.log("Formulário inválido. Verifique os campos.");
    }
  };

  const SuccessMessage = () => {
    if (!successMessage) return null;
    console.log(successMessage);
    return (
      <ContainerMensagensSucesso>
        <p>{successMessage}</p>
      </ContainerMensagensSucesso>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && <ErrorMessages errors={errors} />}
      {successMessage.length > 0 && (
        <SuccessMessage messages={successMessage} />
      )}
      <ContainerInputWrap>
        <input
          className={nomeCompleto !== "" ? "has-val input" : "input"}
          type="text"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
          minLength={3}
          maxLength={100}
        />
        <span className="focus-input" data-placeholder="Nome Completo"></span>
      </ContainerInputWrap>

      <ContainerInputWrap>
        <input
          className={nomeUsuario !== "" ? "has-val input" : "input"}
          type="text"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
          minLength={3}
          maxLength={50}
        />
        <span className="focus-input" data-placeholder="Nome de Usuário"></span>
      </ContainerInputWrap>

      <ContainerInputWrap>
        <input
          className={dataNascimento !== "" ? "has-val input" : "input"}
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
        <span className="focus-input"></span>
      </ContainerInputWrap>

      <ContainerInputWrap>
        <input
          className={email !== "" ? "has-val input" : "input"}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          minLength={5}
          maxLength={150}
        />
        <span className="focus-input" data-placeholder="E-mail"></span>
      </ContainerInputWrap>

      <ContainerInputWrap>
        <input
          className={senha !== "" ? "has-val input" : "input"}
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          minLength={6}
          maxLength={8}
        />
        <span className="focus-input" data-placeholder="Senha"></span>
      </ContainerInputWrap>

      <ContainerInputWrap>
        <input
          className={confirmacaoSenha !== "" ? "has-val input" : "input"}
          type="password"
          value={confirmacaoSenha}
          onChange={(e) => setConfirmacaoSenha(e.target.value)}
        />
        <span
          className="focus-input"
          data-placeholder="Confirmação Senha"
        ></span>
      </ContainerInputWrap>

      <ContainerLoginForm>
        <button className="login-form-btn" type="submit">
          Cadastrar-se
        </button>
      </ContainerLoginForm>
    </form>
  );
}

export default ContainerInputCadastro;
