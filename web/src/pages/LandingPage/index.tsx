import "./style.css"

const LandingPage = () => {
  return (

    <div id="page">
      <nav>
        <ul>
          <li><button id="home"></button></li>
          <li><button id="gameRule"></button></li>
        </ul>
        <ul id="rightNav">
          <li><button id="ptbr"></button></li>
          <li><button id="login">LOGIN</button></li>
        </ul>
      </nav>

      <div id="mainmain">
        <div id="main">
          <div id="boxLeft">
            <img src="../../static/img/gameName.png" alt="" />
            <button id="signUp">Cadastre-se</button>
          </div>

          <div id="boxRight">
            <img src="../../static/img/gameLogo.png" alt="" />
          </div>
        </div>
      </div>


    </div>
  );
};

export default LandingPage;
