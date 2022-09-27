import { useState, useEffect, FC } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AiOutlineCloseCircle } from "react-icons/ai";
import * as S from "./styles";
type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    color: "#000040",
  };
}

type GameRulesProps = {
  closeGameRules: (d: boolean) => void;
};

const GameRules: FC<GameRulesProps> = ({ closeGameRules }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeGameRules(false);
    });
  }, []);

  return (
    <S.Container>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab
              label="COMO JOGAR"
              {...a11yProps(0)}
              sx={{ fontSize: "2rem" }}
            />
            <Tab
              label="PONTUAÇÃO"
              {...a11yProps(1)}
              sx={{ fontSize: "2rem" }}
            />
          </Tabs>
          <AiOutlineCloseCircle
            size={29}
            onClick={() => closeGameRules(false)}
            style={{ cursor: "pointer" }}
            color="#000040"
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {value === 0 && (
            <>
              <Typography
                variant="h3"
                component="h3"
                gutterBottom
                sx={{ color: "#004080", alignContent: "center", marginTop: "1rem", }}
              >
                Regras do Jogo
              </Typography>
              <Typography variant="h6" component="h6" gutterBottom>
                Cada Jogador recebe 5 Cartas aleatórias. A cada rodada teremos
                um jogador que será o contador de histórias. O contador de
                histórias tem a função de selecionar uma de suas cartas e
                descrever essa carta em uma palavra ou frase.{" "}
              </Typography>
              <Typography variant="h6" component="h6" gutterBottom>
                A descrição não deve ser clara o suficiente para que todos os
                outros jogadores acertem a carta escolhida pelo contador de
                histórias, nem vaga demais, de forma que nenhum outro jogador
                acerte. {}
              </Typography>
              <Typography variant="h6" component="h6" gutterBottom>
                Após o contador de histórias realizar sua jogada, os demais
                jogadores devem escolher uma carta que melhor se assemelhe com a
                descrição da carta do contador de histórias. Após todos terem
                jogado, os jogadores devem tentar adivinhar qual é a carta do
                contador de histórias.
              </Typography>
            </>
          )}
          {value === 1 && (
            <>
              <Typography
                variant="h3"
                component="h3"
                gutterBottom
                sx={{
                  color: "#004080",
                  alignContent: "center",
                  marginTop: "1rem",
                }}
              >
                Pontuação
              </Typography>
              <Typography variant="h6" component="h6" gutterBottom>
                Caso todos jogadores ou nenhum deles acertem a carta do contador
                de histórias, este não receberá nenhum ponto e todos os demais
                recebem 2 pontos.
              </Typography>
              <Typography variant="h6" component="h6" gutterBottom>
                Caso o contador de história receba ao menos um voto mas não
                todos, ele receberá 3 pontos.
              </Typography>
              <Typography variant="h6" component="h6" gutterBottom>
                Os jogadores que escolheram a carta correta também ganham 3
                pontos.
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </S.Container>
  );
};

export default GameRules;
