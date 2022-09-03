import { Navbar, BoxBody } from "../../components";
import * as S from "./styles";

const Home = () => {
  return (
    <S.Container>
      <Navbar />

      <h1>Home</h1>
      <S.Body>
        <BoxBody />
      </S.Body>
    </S.Container>
  );
};

export default Home;
