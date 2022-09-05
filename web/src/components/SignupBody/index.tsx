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
                    <h1 style={{ "font-size": "40px", "color": "white" }}>Cadastre-se</h1>
                    <input style={{ "height": "35px", "width": "200px", "border-radius": "12px", "margin-top": "10px" }} type="text" placeholder='Nome' />
                    <input style={{ "height": "35px", "width": "200px", "border-radius": "12px", "margin-top": "10px" }}  type="text" placeholder='Email' />
                    <input style={{ "height": "35px", "width": "200px", "border-radius": "12px", "margin-top": "10px" }}  type="password" placeholder='Senha' />
                    <input style={{ "height": "35px", "width": "200px", "border-radius": "12px", "margin-top": "10px" }}  type="password" placeholder='Confirmar Senha' />
                    <S.BtnSignin>
                        <S.SignupButton>Cadastrar</S.SignupButton>
                    </S.BtnSignin>
            </S.MainBox>
        </S.Container>
    );
};

export default SigninBody;