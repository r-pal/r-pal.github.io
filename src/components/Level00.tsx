import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { canvasWidth, canvasHeight } from "../constants/canvas";
import { Settings } from "./CircleSettings";


type Level00Props = {
  settings: Settings;
};

const Level00: React.FC<Level00Props> = ({
  settings,
}) => {
  const diameter = settings.radius * 2;
  const j = settings.jiggliness;

  const sketch = (s: P5CanvasInstance) => {
    let x: number;
    let y: number;
    s.setup = () => {
      s.createCanvas(canvasWidth, canvasHeight);
      x = s.width;
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
        // in case it jiggles off screen x-axis:
        if (x < 0) {
          x = s.width;
        }
        x = x - 1
      }
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
};

export default Level00;
