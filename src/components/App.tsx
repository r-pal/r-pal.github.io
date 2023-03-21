import { useState, useEffect } from "react";
import CircleSettings, { Settings } from "./Settings";
import Game from "./Game";
import Header from "./Header";

const App: React.FC = () => {
  const [gameResult, setGameResult] = useState<"won" | "lost">();
  const [gameLive, setGameLive] = useState(false);
  const [settings, setSettings] = useState<Settings>();
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState("Welcome to Circles!");

  const startGame = () => {
    if (gameLive === false) {
      setGameResult(undefined);
      setGameLive(true);
    }
    return;
  };

  useEffect(() => {
    if (gameResult === "won") {
      setLevel(level + 1);
    }
  }, [gameResult]);

  return (
    <div>
      <div className="drawer">
        <input id="settings-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Header
            gameLive={gameLive}
            gameResult={gameResult}
            level={level}
            message={message}
            startGame={startGame}
          />
          <div className="bg-[#315964]">
            {settings && gameResult === undefined && (
              <Game
                settings={settings}
                setGameResult={setGameResult}
                setGameLive={setGameLive}
                level={level}
                setMessage={setMessage}
              />
            )}
            <h1 className="text-[#EDFFD9] text-5xl md:text-9xl place-content-center grid">
              {gameResult === "won" && "WINNER"}
              {gameResult === "lost" && "YOU LOSE"}
            </h1>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="settings-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 bg-[#EDFFD9]/50 w-48 pt-10 xl:pt-20">
            <CircleSettings setSettings={setSettings} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
