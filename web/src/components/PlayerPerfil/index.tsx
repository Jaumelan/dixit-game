import { useState, useEffect, FC } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import * as S from "./styles";
import { Button } from "../../components";
import { UserAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

type Props = {
  closePlayerPerfil: (d: boolean) => void;
  //onClick: (e: any) => void;
};

const PlayerPerfil: FC<Props> = ({ closePlayerPerfil }) => {
  const { user, handleSetUser } = UserAuth();
  const [update, setUpdate] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const { enqueueSnackbar } = useSnackbar();

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

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      fetch("http://localhost:8080/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user?.accessToken,
        },
        body: JSON.stringify({ email: user?.email, username }),
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data.data);
          if (data.messages.length === 0) {
            setUpdate(false);
            handleSetUser({
              email: data.data.email,
              username: data.data.username,
            });
          } else {
            enqueueSnackbar(data.messages[0], { variant: "error" });
          }
        });
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <S.Container onClick={()=>{}}>
      <S.Header>
        <S.ButtonHolder>
          <AiOutlineCloseCircle
            onClick={() => closePlayerPerfil(false)}
            size={28}
            color='white'
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

            <S.UpdateInput
              type="text"
              value={username}
              onChange={handleUsername}
            />
            <S.SubmitHolder>
              <Button type="button" onClick={handleSubmit}>
                Atualizar
              </Button>
            </S.SubmitHolder>
          </S.UpdateContainer>
        ) : (
          <>
            <S.Info>
              <h2>Email: </h2>

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
