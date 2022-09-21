const scoreCalculator = (
  data: { email: string; cardsPlayed: string[]; choosenCard: string }[],
  playersName: string,
) => {
  const score = data.map((player) => ({
    email: player.email,
    score: 0,
  }));

  data.forEach((player) => {
    const { email, cardsPlayed } = player;
    if (email === playersName) {
      const selected = data.reduce((acc, player) => {
        if (player.email !== playersName) {
          const { choosenCard } = player;
          if (cardsPlayed.includes(choosenCard)) {
            acc += 1;
          } else {
            acc += 0;
          }
        }
        return acc;
      }, 0);
      if (selected > 0 && selected < data.length - 1) {
        score.forEach((player) => {
          if (player.email === playersName) {
            player.score += 3;
          }
        });
      } else if (selected === data.length - 1) {
        score.forEach((player) => {
          if (player.email === playersName) {
            player.score += 0;
          } else {
            player.score += 2;
          }
        });
      } else if (selected === 0) {
        score.forEach((player) => {
          if (player.email === playersName) {
            player.score += 0;
          } else {
            player.score += 2;
          }
        });
      }
    } else {
      const { choosenCard } = player;
      if (cardsPlayed.includes(choosenCard)) {
        score.forEach((player) => {
          if (player.email === email) {
            player.score += 1;
          }
        });
      }
    }
  });
  return score;
};

export default scoreCalculator;
