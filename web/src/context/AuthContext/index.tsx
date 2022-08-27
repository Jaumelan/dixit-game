import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../services/firebaseSetup";
import { IGoogleResponse } from "../../@types/dixit";

const AuthContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleSignIn: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logOut: () => {},
  user: {} || null,
});

interface UserAuth {
  children: React.ReactNode;
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider: React.FC<UserAuth> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [user, setUser] = useState<IGoogleResponse | null>(null);
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
        
          setUser(user as unknown as IGoogleResponse);
          console.log("User signed in", user);
        }
       else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  console.log('user', user);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
