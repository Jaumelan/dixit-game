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
      //conta quantas pessoas escolheram a carta do jogador dixit
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
      //se pelo menos uma pessoa escolheu a carta do jogador dixit, o jogador ganha 3 pontos
      if (selected > 0 && selected < data.length - 1) {
        score.forEach((player) => {
          if (player.email === playersName) {
            player.score += 3;
          }
        });
        //se todos ou ninguém escolher a carta do jogador dixit, o jogador não ganha nenhum ponto
        //e todos os outros jogadores ganham 2 pontos
      } else if (selected === data.length - 1 || selected === 0) {
        score.forEach((player) => {
          if (player.email === playersName) {
            player.score += 0;
          } else {
            player.score += 2;
          }
        });
      } /* else if (selected === 0) {
        score.forEach((player) => {
          if (player.email === playersName) {
            player.score += 0;
          } else {
            player.score += 2;
          }
        });
      } */
    } else {
      //se não for jogador dixit
      const { email, choosenCard } = player;
      //conta quantas pessoas escolheram a carta do jogador
      const selected = data.reduce((acc, player) => {
        if (player.email !== email) {
          if (cardsPlayed.includes(choosenCard)) {
            acc += 1;
          } else {
            acc += 0;
          }
        }
        return acc;
      }, 0);

      if (selected > 0) {
        score.forEach((player) => {
          if (player.email === email) {
            player.score += selected;
          }
        });
      }
      /* if (cardsPlayed.includes(choosenCard)) {
        score.forEach((player) => {
          if (player.email === email) {
            player.score += 1;
          }
        });
      } */
    }
  });
  return score;
};

export default scoreCalculator;
