import GoogleButton from "react-google-button";
import { UserAuth } from "../../context/AuthContext";

const GoogleLogin = () => {
  const { googleSignIn } = UserAuth();

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <GoogleButton onClick={handleGoogleLogin} />
    </div>
  );
};

export default GoogleLogin;
