import * as S from "./styles";

const Loading = () => {
  return (
    <S.SpinnerHolder>
      <S.Spinner>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </S.Spinner>
    </S.SpinnerHolder>
  );
};

export default Loading;
