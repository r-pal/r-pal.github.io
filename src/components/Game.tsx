import { Settings } from "./Settings";
import Level01 from "./Level01";
import Level02 from "./Level02";

type GameProps = {
  settings: Settings;
  setGameResult: (value: "won" | "lost" | undefined) => void;
  setGameLive: (value: boolean) => void;
  level: number;
};

const Game: React.FC<GameProps> = ({
  settings,
  setGameResult,
  setGameLive,
  level,
}) => {
  const levels = [
    <Level01
      settings={settings}
      setGameResult={setGameResult}
      setGameLive={setGameLive}
    />,
    <Level02
      settings={settings}
      setGameResult={setGameResult}
      setGameLive={setGameLive}
    />,
  ];

  return (
    <>
      {/* {levels[level - 1]} */}
      {levels[1]}
    </>
  );
};

export default Game;
