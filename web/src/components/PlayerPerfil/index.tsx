import { useState, useEffect, FC } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import * as S from "./styles";
import { UserAuth } from "../../context/AuthContext";

type Props = {
  closePlayerPerfil: (d: boolean) => void;
};

const PlayerPerfil: FC<Props> = ({ closePlayerPerfil }) => {
  const { user } = UserAuth();
  const [update, setUpdate] = useState<boolean>(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePlayerPerfil(false);
    });
  }, []);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(username);
  };

  return (
    <S.Container>
      <S.Header>
        <S.ButtonHolder>
          <AiOutlineCloseCircle
            onClick={() => closePlayerPerfil(false)}
            size={28}
            color={"#8080c0"}
            style={{ cursor: "pointer" }}
          />
        </S.ButtonHolder>

        <S.AvatarHolder>
          <S.Avatar src={user?.profilePicture} alt="profile avatar" />
          <S.AvatarName>{user?.username}</S.AvatarName>
        </S.AvatarHolder>
      </S.Header>
      <S.InfoContainer>
        {update ? (
          <S.UpdateContainer>
            <S.UpdateTitleHolder>
              <h3>Atualizar Nome</h3>
              <IoArrowBackCircleOutline
                size={25}
                color={"#5959ac"}
                style={{ cursor: "pointer" }}
                onClick={handleUpdate}
              />
            </S.UpdateTitleHolder>

            <S.UpdateInput type="text" value={username} onChange={handleUsername} />
            <S.UpdateButton type="button" onClick={handleSubmit}>Atualizar</S.UpdateButton>
          </S.UpdateContainer>
        ) : (
          <>
            <S.Info>
              <h2>Email</h2>

              <p>{user?.email}</p>
            </S.Info>
            <S.UpdateTitle onClick={handleUpdate}>
              Deseja atualizar o username
            </S.UpdateTitle>
          </>
        )}
      </S.InfoContainer>
    </S.Container>
  );
};

export default PlayerPerfil;
