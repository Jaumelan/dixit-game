import { IconContainer } from "../Navbar/styles";
import * as S from "./styles";

const PlayerPerfil = ({ closePlayerPerfil }: any) => {

    return (
        <S.Container>
            <S.PlayerPerfilContainer>
                <button onClick={() => closePlayerPerfil(false)}> X </button>
                <S.Perfil>
                    <h3>Perfil</h3>
                    <S.TopicContainer>
                        <p>COLOCAR IMAGEM DO USUÁRIO</p>
                    </S.TopicContainer>
                    <S.TopicContainer>
                        <p>NOME USUÁRIO</p>
                    </S.TopicContainer>
                    <S.TopicContainer>
                        <p>EMAIL USUÁRIO</p>
                    </S.TopicContainer>
                    <S.TopicContainer>
                        <p>PARTIDAS VENCIDAS</p>
                    </S.TopicContainer>
                </S.Perfil>
            </S.PlayerPerfilContainer>
        </S.Container>
    );
};

export default PlayerPerfil;