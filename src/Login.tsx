import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundContainer from "./components/BackgroundContainer";
import ContainerLoginWrap from "./components/ContainerLoginWrap";
import LogoLogin from "./components/LogoLogin";
import ContainerInputWrap from "./components/ContainerInputWrap";

const FormularioLogin = styled.form`
  width: 100%;
`
const Link = styled.a`
  font-size: 14px;
  color: #6a0e47;
  line-height: 1.5;
  text-decoration: none;
  cursor: pointer;
`
//fazer um componente
const ContainerMensagens = styled.div`
    background-color: #f8d7da; /* Cor de fundo vermelha clara */
    color: #721c24; /* Cor do texto vermelho escuro */
    border: 1px solid #f5c6cb; /* Borda vermelha clara */
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`

const ContainerMensagensSucesso = styled.div`
    background-color: #d4edda; /* Cor de fundo verde clara */
    color: #155724; /* Cor do texto verde escuro */
    border: 1px solid #c3e6cb; /* Borda verde clara */
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  function limparCampos() {
    setEmail("");
    setSenha("")
  }

  const validate =  async () => {
    const errors = [];

    if (!email)
      errors.push("E-mail é obrigatório");
    if (!senha) 
      errors.push("Senha é obrigatória");

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const ErrorMessages = ({ errors = {}}) => {
    return (
      <ContainerMensagens>
        {Object.keys(errors).map((key, index) => (
          <p key={index} className="error-message">{errors[key]}</p>
        ))}
      </ContainerMensagens>
    );
  };


  const handleSubmit = async (e) => {
    setSuccessMessage("")
    e.preventDefault();
    const isValid = await validate();
    if (isValid) {
      try {
        const response = await fetch(`http://localhost:8080/api/livros/usuario-cadastrado?email=${email}&senha=${senha}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao cadastrar usuário');
        }
        console.log(response.body)

        setSuccessMessage('Usuário cadastrado com sucesso');
    } catch (error) {
        console.error('Erro ao cadastrar usuário', error);
      }
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  };

  return (
    <BackgroundContainer>
      <ContainerLoginWrap>
        <FormularioLogin onSubmit={handleSubmit}>
          <LogoLogin/>      
          {errors.length > 0 && <ErrorMessages errors={errors} />}
          <ContainerInputWrap>
            <input
              className={email !== "" ? "has-val input" : "input"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="focus-input" data-placeholder="E-mail"></span>
          </ContainerInputWrap>

          <ContainerInputWrap>
            <input
              className={senha !== "" ? "has-val input" : "input"}
              type="pas"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Senha"></span>
          </ContainerInputWrap>

          <div className="container-login-form-btn">
            <button
              className="login-form-btn"
            >
              Login
            </button>
          </div>

          <div className="text-center">
            <span className="txt1">Não possui conta? </span>
            <Link onClick = {() => {
                  navigate('/login/cadastro')
                }}>
              Criar conta
            </Link>
          </div>
        </FormularioLogin>
      </ContainerLoginWrap>
    </BackgroundContainer>
  );
}
export default Login;
