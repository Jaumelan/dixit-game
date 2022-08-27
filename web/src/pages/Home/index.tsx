import { UserAuth } from "../../context/AuthContext";

const Home = () => {
  const { logOut } = UserAuth();

  const handleLogOut =  async () => {
    await logOut();
  };
  return (
    <div>
      <h1>Home</h1>
      <button type="button" onClick={handleLogOut}>
        Sair
      </button>
    </div>
  );
};

export default Home;
