import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  //onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../services/firebaseSetup";
import { IRegisterUser, ILoginUser, UpdateUserType } from "../../@types/dixit";
import { useSnackbar } from "notistack";

type AuthContextType = {
  user: {
    email: string;
    profilePicture: string;
    username: string;
    accessToken: string;
  } | null;
  error: string | null;
  googleSignIn: () => void;
  registerUser: (user: IRegisterUser) => void;
  loginUser: (user: ILoginUser) => void;
  logoutUser: () => void;
  handleSetUser: (user: UpdateUserType) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleSignIn: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logOut: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loginUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logoutUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleSetUser: () => {},
  user: null,
  error: null,
});

interface UserAuth {
  children: React.ReactNode;
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider: React.FC<UserAuth> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [user, setUser] = useState<{
    email: string;
    profilePicture: string;
    username: string;
    accessToken: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const registerUser = async (data: IRegisterUser) => {
    fetch("http://68.232.175.134:8080/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        const { data, messages } = response;
        if (Object.keys(data).length > 0) {
          setUser({
            email: data.email,
            profilePicture: data.profilePicture,
            username: data.username,
            accessToken: data.accessToken,
          });
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              email: data.email,
              profilePicture: data.profilePicture,
              username: data.username,
              accessToken: data.accessToken,
            })
          );
        } else {
          setError(messages[0]);
          setUser(null);
          //console.log("response", response);
        }
      })

      .catch((err) => console.log(err));
  };

  const loginUser = async (data: ILoginUser) => {
    fetch("http://68.232.175.134:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        //console.log(response);
        const { data, messages } = response;
        if (Object.keys(data).length > 0) {
          setUser({
            email: data.email,
            profilePicture: data.profile,
            username: data.username,
            accessToken: data.accessToken,
          });
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              email: data.email,
              profilePicture: data.profile,
              username: data.username,
              accessToken: data.accessToken,
            })
          );
        } else {
          switch (messages[0]) {
            case "User not found":
              setError("Crie uma conta para jogar");
              break;
            case "Wrong password":
              setError("Senha incorreta");
              break;
            default:
              setError("Erro ao logar");
              break;
          }

          setUser(null);
        }
      })
      .catch((err) => console.log(err));
  };

  const logoutUser = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  const handleSetUser = (data: UpdateUserType) => {
    if (data.username && user) {
      setUser({ ...user, username: data.username });

      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          username: data.username,
        })
      );
    }
  };

  useEffect(() => {
    const checkUser = sessionStorage.getItem("user");
    if (checkUser) {
      setUser(JSON.parse(checkUser));
    }
  }, []);
  /* useEffect(() => {
    console.log("user ", user);
  }, [user]); */

  useEffect(() => {
    //console.log("error ", error);
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        user,
        registerUser,
        loginUser,
        logoutUser,
        error,
        handleSetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
