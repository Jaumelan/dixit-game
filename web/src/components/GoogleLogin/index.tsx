import { Button } from "../../components";
import { BUTTON_TYPE_CLASSES } from "../Button";

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
      <Button
        buttonType={BUTTON_TYPE_CLASSES.google}
        onClick={handleGoogleLogin}
      ></Button>
    </div>
  );
};

export default GoogleLogin;
