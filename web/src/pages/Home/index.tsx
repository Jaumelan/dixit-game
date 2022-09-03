import { UserAuth } from "../../context/AuthContext";
import { Navbar } from "../../components";
import * as S from "./styles";

const Home = () => {
  const { logOut } = UserAuth();

  const handleLogOut =  async () => {
    await logOut();
  };
  return (
    <S.Container>
      <Navbar />
      <h1>Home</h1>
      <button type="button" onClick={handleLogOut}>
        Sair
      </button>
    </S.Container>
  );
};

export default Home;
