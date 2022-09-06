import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../services/firebaseSetup";
import { IGoogleResponse, IRegisterUser, ILoginUser } from "../../@types/dixit";

type AuthContextType = {
  user: string | null;
  googleSignIn: () => void;
  registerUser: (user: IRegisterUser) => void;
  loginUser: (user: ILoginUser) => void;
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
  user: null,
});

interface UserAuth {
  children: React.ReactNode;
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider: React.FC<UserAuth> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [user, setUser] = useState<string | null>(null);
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { providerData } = user;
        const data = providerData[0].email;

        setUser(data);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const registerUser = async (data: IRegisterUser) => {
    fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.email);
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
      .then((data) => {
        console.log(data);
        setUser(data.email);
      })
      .catch((err) => console.log(err));
  };

  console.log("user", user);

  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, user, registerUser, loginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
