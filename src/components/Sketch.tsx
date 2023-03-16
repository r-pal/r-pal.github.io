import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { Inputs } from "./CircleSettings";

type SketchProps = {
  circleSketch: Inputs;
  setGameResult: (value: "won" | "lost" | undefined) => void;
  setGameLive: (value: boolean) => void;
};

const Sketch: React.FC<SketchProps> = ({
  circleSketch,
  setGameResult,
  setGameLive,
}) => {
  const diameter = circleSketch.radius * 2;
  const j = circleSketch.jiggliness;
  const canvasWidth = () => {
    if (window.innerWidth > 200) {
      return window.innerWidth;
    } else return 200;
  };

  const bannerHeight = () => {
    if (window.innerWidth > 1280) {
      return 66;
    }
    return 35;
  };

  const canvasHeight = () => {
    if (window.innerHeight > 200) {
      return window.innerHeight - bannerHeight();
    } else return 200;
  };
  const sketch = (s: P5CanvasInstance) => {
    let x: number;
    let y: number;
    let n: number;
    let circles = [];

    s.setup = () => {
      s.createCanvas(canvasWidth(), canvasHeight());
      x = s.random(0, s.width);
      y = s.random(s.height / 2, s.height / 3);
    };

    s.draw = () => {
      s.background(50, 89, 100);
      n = 6;
      for (let i = 0; i < n; i++) {
        s.ellipse(x, y, diameter, diameter);
        s.fill(circleSketch.colour1);
        s.stroke(circleSketch.colour2);
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
        //
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

export default Sketch;
