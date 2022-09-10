import { useState, FC, useEffect } from "react";
import PlayerSpinner from "../PlayerSpinner";
import * as S from "./styles";

type PlayerProps = {
  data: {
    username: string;
    email: string;
  };
  index: number;
};

const Player: FC<PlayerProps> = ({ data, index }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("data", data);
    if (data.username !== "") {
      setLoading(false);
    }
  }, [data]);

  return loading ? (
    <PlayerSpinner />
  ) : (
    <S.Container>
      <S.IndexContainer>{index+1}</S.IndexContainer>
      <S.Name>{data.username}</S.Name>
      
    </S.Container>
  );
};

export default Player;
