import { useState, FC } from "react";
import Carrousel from "../../components/Carrousel";
import Pattern from "../../assets/images/pattern.jpg";
import { Button } from "../../components";
import { UserAuth } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";
import { usePlayContext } from "../../context/PlayContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as S from "./styles";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#cfb521",
      contrastText: "#cccccc",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeightBold: 900,
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    secondary: Palette["secondary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    secondary?: PaletteOptions["secondary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    secondary: true;
  }
}

const DixitTurn = () => {
  const [dixitMessage, setDixitMessage] = useState("");
  const [dixitImage, setDixitImage] = useState(Pattern);
  const { user } = UserAuth();
  const { handleUpdateGameSetter, playersSelectCards, continuePlaying } =
    usePlayContext();

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
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            label="Escreva uma mensagem"
            variant="outlined"
            color="secondary"
            sx={{ width: "60%" }}
            value={dixitMessage}
            onChange={handleDixitChange}
            inputProps={{ maxLength: 50 }}
          />
        </ThemeProvider>

        {dixitMessage.length > 3 ? (
         <Button onClick={handleDixitSubmit}>Dixit</Button>
        ) : (
          <Button disabled>Dixit</Button>
        )}
        
      </S.MessageContainer>
    </S.Container>
  );
};
export default DixitTurn;
