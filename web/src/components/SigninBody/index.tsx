
import * as S from "./styles";
import GoogleLogin from "../../components/GoogleLogin";
import BodyCards from "../BodyBoxCards";

const SigninBody = () => {
    return (
        <S.Container>
            <S.CardsContainer>
                <BodyCards />
            </S.CardsContainer>
            <S.MainBox>
                    <h1 style={{ "font-size": "40px", "color": "white" }}>Login</h1>
                    <input style={{ "height": "35px", "width": "200px", "border-radius": "12px", "margin-top": "10px" }} type="text" placeholder='Usuário' />
                    <input style={{ "height": "35px", "width": "200px", "border-radius": "12px", "margin-top": "10px" }}  type="password" placeholder='Senha' />
                    <S.BtnSignin>
                        <S.LoginButton id="login">Entrar</S.LoginButton>
                    </S.BtnSignin>
                    <GoogleLogin />
            </S.MainBox>
        </S.Container>
    );
};

export default SigninBody;