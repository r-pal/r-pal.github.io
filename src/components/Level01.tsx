import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { canvasWidth, canvasHeight } from "../constants/canvas";
import { Settings } from "./Settings";

type Level01Props = {
  settings: Settings;
  setGameResult: (value: "won" | "lost" | undefined) => void;
  setGameLive: (value: boolean) => void;
};

const Level01: React.FC<Level01Props> = ({
  settings,
  setGameResult,
  setGameLive,
}) => {
  const diameter = settings.radius * 2;
  const j = settings.jiggliness;

  const sketch = (s: P5CanvasInstance) => {
    let x: number;
    let y: number;

    s.setup = () => {
      s.createCanvas(canvasWidth, canvasHeight);
      x = s.random(0, s.width);
      y = s.random(s.height / 2, s.height / 3);
    };

    s.draw = () => {
      s.background(50, 89, 100);
      for (let i = 0; i < 6; i++) {
        s.ellipse(x, y, diameter, diameter);
        s.fill(settings.colour1);
        s.stroke(settings.colour2);
        // jiggling
        x = x + s.random(-j, j);
        y = y + s.random(-j, j);
        // lose condition
        if (y < 0) {
          setGameResult("lost");
          setGameLive(false);
        }
        // win condition
        if (y >= s.height) {
          setGameResult("won");
          setGameLive(false);
        }
        // in case it jiggles off screen x-axis:
        if (x < 0) {
          x = s.width;
        }
        y = y - 1;
      }
    };

    s.mousePressed = () => {
      let d = s.dist(s.mouseX, s.mouseY, x, y);
      if (d < diameter) {
        y = y + 100;
      }
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
};

export default Level01;
