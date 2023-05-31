import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { canvasWidth, canvasHeight } from "../constants/canvas";
import { Settings } from "./CircleSettings";

type Level00Props = {
  settings: Settings;
  startGame: () => void;
};

const Level00: React.FC<Level00Props> = ({ settings, startGame }) => {
  const diameter = settings.radius * 2;
  const j = settings.jiggliness;

  const sketch = (s: P5CanvasInstance) => {
    let x: number;
    let y: number;
    const isCursorInsideCircle = () => {
      let d = s.dist(s.mouseX, s.mouseY, x, y);
      return d < diameter / 2;
    };
    s.setup = () => {
      s.createCanvas(canvasWidth, canvasHeight);
      x = s.random(0, s.width - 100);
      y = s.height / 2;
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
        if (x < 0) {
          x = s.width;
        }
        if (x > s.width) {
          x = 0;
        }
        x = x + 1;
      }

      if (isCursorInsideCircle()) {
        s.cursor("pointer");
      } else {
        s.cursor("default");
      }

      s.mousePressed = () => {
        if (isCursorInsideCircle()) {
          startGame();
        }
      };
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
};

export default Level00;
