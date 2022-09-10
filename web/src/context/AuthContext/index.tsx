import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  //onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../services/firebaseSetup";
import { IRegisterUser, ILoginUser } from "../../@types/dixit";
import { useSnackbar } from "notistack";

type AuthContextType = {
  user: { email: string; profilePicture: string, username: string } | null;
  error: string | null;
  googleSignIn: () => void;
  registerUser: (user: IRegisterUser) => void;
  loginUser: (user: ILoginUser) => void;
  logoutUser: () => void;
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

  /*  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const { providerData } = user;
        const data = providerData[0].email;

        setUser(data);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []); */

  const registerUser = async (data: IRegisterUser) => {
    fetch("http://localhost:8080/user/register", {
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
          });
        } else {
          setError(messages[0]);
          setUser(null);
          //console.log("response", response);
        }
      })
      .catch((err) => console.log(err));
  };

  const loginUser = async (data: ILoginUser) => {
    fetch("http://localhost:8080/user/login", {
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
          });
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
  };


  useEffect(() => {
    console.log("error ", error);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
