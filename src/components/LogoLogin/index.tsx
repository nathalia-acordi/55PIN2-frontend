import styled from "styled-components";

const TituloFormulario = styled.span`
  font-family: Nunito, sans-serif;
  display: block;
  font-size: 30px;
  color: azure;
  line-height: 1.2;
  text-align: center;
`

function LogoLogin() {
    return(
        <TituloFormulario>
            <img src="/LiteraLogo2.png" />
        </TituloFormulario>
    )
}

export default LogoLogin