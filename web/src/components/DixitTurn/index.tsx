import { useState, FC } from "react";
import Carrousel from "../../components/Carrousel";
import Pattern from "../../assets/images/pattern.jpg";
import { Button } from "../../components";
import { UserAuth } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";
import { usePlayContext } from "../../context/PlayContext";
import * as S from "./styles";

const DixitTurn = () => {
  const [dixitMessage, setDixitMessage] = useState("");
  const [dixitImage, setDixitImage] = useState(Pattern);
  const { user } = UserAuth();
  const { handleUpdateGameSetter, playersSelectCards } = usePlayContext();

  const handleDixitChange = (e: any) => {
    setDixitMessage(e.target.value);
  };

  const handleSelectImage = (e: any) => {
    setDixitImage(e.target.src);
  };

  const handleDixitSubmit = (e: any) => {
    e.preventDefault();
    if (user) {
      const data = {
        email: user?.email,
        message: dixitMessage,
        cardsPlayed: dixitImage,
      };

      handleUpdateGameSetter(data);
    }
  };

  return playersSelectCards ? (
    <S.Container>
      <h2>Espere pelos outros jogadores</h2>
    </S.Container>
  ) : (
    <S.Container>
      <S.EveryImagesContainer>
        <S.IncreasedImageContainer>
          <S.IncreasedImage src={dixitImage} alt="dixitImage" />
        </S.IncreasedImageContainer>
        <Carrousel getSelectedImg={handleSelectImage} />
      </S.EveryImagesContainer>

      <S.MessageContainer>
        <TextField
          id="outlined-basic"
          label="Escreva uma mensagem"
          variant="outlined"
          color="secondary"
          sx={{ width: "60%", fontSize: "5rem" }}
          value={dixitMessage}
          onChange={handleDixitChange}
        />
        {/* <input type="text" value={dixitMessage} onChange={handleDixitChange} /> */}
        <Button onClick={handleDixitSubmit}>Dixit</Button>
      </S.MessageContainer>
    </S.Container>
  );
};
export default DixitTurn;
