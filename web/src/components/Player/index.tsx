import { useState } from "react";
import PlayerSpinner from "../PlayerSpinner";

const Player = () => {
  const [loading, setLoading] = useState(true);

  return loading ? <PlayerSpinner /> : <div>Player</div>;
};

export default Player;
