import { useState, FC, useEffect } from "react";
import PlayerSpinner from "../PlayerSpinner";
import { usePlayContext } from "../../context/PlayContext";
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
  const { playersName } = usePlayContext();

  useEffect(() => {
    if (data.username !== "") {
      //console.log("loading false");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [data]);

  return loading ? (
    <PlayerSpinner />
  ) : playersName === data.email ?(
    <S.PlayingContainter>
      <S.IndexContainer>{index + 1}</S.IndexContainer>
      <S.PlayingName>{data.username}</S.PlayingName>
    </S.PlayingContainter>
  ) : (
    <S.Container>
      <S.IndexContainer>{index + 1}</S.IndexContainer>
      <S.Name>{data.username}</S.Name>
    </S.Container>
  );
};

export default Player;
