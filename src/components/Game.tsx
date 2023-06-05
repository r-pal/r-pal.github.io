import { Settings } from "./CircleSettings";
import Level01 from "./Level01";
import Level02 from "./Level02";
import Level03 from "./Level03";
import Level04 from "./Level04";

type GameProps = {
  settings: Settings;
  setGameResult: (value: "won" | "lost" | undefined) => void;
  setGameLive: (value: boolean) => void;
  level: number;
  setMessage: (value: string) => void;
};

const Game: React.FC<GameProps> = ({
  settings,
  setGameResult,
  setGameLive,
  level,
  setMessage,
}) => {
  const levels = [
    <Level01
      settings={settings}
      setGameResult={setGameResult}
      setGameLive={setGameLive}
      setMessage={setMessage}
    />,
    <Level02
      settings={settings}
      setGameResult={setGameResult}
      setGameLive={setGameLive}
      setMessage={setMessage}
    />,
    <Level03
      settings={settings}
      setGameResult={setGameResult}
      setGameLive={setGameLive}
      setMessage={setMessage}
    />,
    <Level04
      settings={settings}
      setGameResult={setGameResult}
      setGameLive={setGameLive}
      setMessage={setMessage}
    />,
  ];

  return <>{levels[level - 1]}</>;
};

export default Game;
