import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../services/firebaseSetup";
import { IGoogleResponse } from "../../@types/dixit";

type AuthContextType = {
  user: string | null;
  googleSignIn: () => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleSignIn: () =>  {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logOut: () => {},
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

  console.log("user", user);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
