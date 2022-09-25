import { ReactElement } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useGameContext } from "../context/GameContext";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Signup from "../pages/Signup";
import Game from "../pages/Game";

interface IChildren {
  children: ReactElement;
}

const PrivateRoute = ({ children }: IChildren) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return children;
};

const PublicRoute = ({ children }: IChildren) => {
  const { user } = UserAuth();
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

const RoutesConfig = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dixit" />} />

      <Route
        path="dixit"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />

      <Route
        path="signin"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />

      <Route
        path="signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="game/:pin"
        element={
          <PrivateRoute>
            <Game />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default RoutesConfig;
