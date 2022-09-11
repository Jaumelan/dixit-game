import * as S from "./styles";

const GameRules = () => {
  return (
    <S.Container>
      <S.Rules>
        <h3>Regras do Jogo</h3>
        <ul>
            <li>Cada Jogador recebe 6 Cartas aleatórias.</li>
            <li>A cada rodada teremos um jogador que será o contador de histórias.</li>
            <li>O contador de histórias tem a função de selecionar uma de suas cartas e descrever essa carta em uma palavra ou frase.</li>
            <li>A descrição não deve ser clara o suficiente para que todos os outros jogadores acertem a carta escolhida pelo contador de histórias, nem vaga demais, de forma que nenhum outro jogador acerte.</li>
            <li>Após o contador de histórias realizar sua jogada, os demais jogadores devem escolher uma carta que melhor se assemelhe com a descrição da carta do contador de histórias.</li>
            <li>Após todos terem jogado, os jogadores devem tentar adivinhar qual é a carta do contador de histórias.</li>
        </ul>
        <h3>Pontuação</h3>
        <ul>
            <li>Caso todos jogadores ou nenhum deles acertem a carta do contador de histórias, este não receberá nenhum ponto e todos os demais recebem 2 pontos.</li>
            <li>Caso o contador de história receba ao menos um voto mas não todos, ele receberá 3 pontos.</li>
            <li>Os jogadores que escolheram a carta correta também ganham 3 pontos.</li>
            <li>Os jogadores, com excessão ao contador de histórias, que tiveram sua carta escolhidas pelos demais jogadores ganham 1 ponto para cada escolha.</li>
        </ul>
      </S.Rules>
    </S.Container>
  );
};

export default GameRules;