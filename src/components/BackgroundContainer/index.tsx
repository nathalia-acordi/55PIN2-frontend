import styled from "styled-components"

const BackgroundContainer = styled.div`
  background: ${props => props.fundo || "url(./fundo-login.png) no-repeat"};
  background-size: cover;
  background-position: center;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
export default BackgroundContainer