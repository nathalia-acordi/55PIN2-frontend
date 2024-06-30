import ContainerLoginWrap from "../ContainerLoginWrap";
import BackgroundContainer from "../BackgroundContainer";
import LogoLogin from "../LogoLogin";
import ContainerInputCadastro from "../ContainerInputCadastro";

function CadastroConta() {
    return(
        <BackgroundContainer
            fundo="url(../fundo-login.png) no-repeat">
            <ContainerLoginWrap
                largura="540px">
                <LogoLogin/>
                <ContainerInputCadastro/>
            </ContainerLoginWrap>
        </BackgroundContainer>
    )
}

export default CadastroConta