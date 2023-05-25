import { useCallback, useEffect, useState } from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { canvasHeight, canvasWidth } from "../constants/canvas";
import { Settings } from "./CircleSettings";

type Level03Props = {
  settings: Settings;
  setGameResult: (value: "won" | "lost" | undefined) => void;
  setGameLive: (value: boolean) => void;
  setMessage: (value: string) => void;
};

const Level03: React.FC<Level03Props> = ({
  settings,
  setGameResult,
  setGameLive,
  setMessage,
}) => {
  const j = settings.jiggliness;
  const [fill, setFill] = useState(settings.colour1);
  const [stroke, setStroke] = useState(settings.colour2);
  useEffect(() => {
    setMessage("It's a waiting game");
  }, []);

  const sketch = useCallback(
    (s: P5CanvasInstance) => {
      let x: number;
      let y: number;
      let visitedPixels: boolean[][];
      let colour1 = settings.colour1;
      let colour2 = settings.colour2;

      s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight);
        x = Math.round(s.random(0, s.width));
        y = Math.round(s.random(0, s.height));

        // Initialize visitedPixels as a 2D array with the same size as the canvas.
        visitedPixels = Array(canvasWidth)
          .fill(false)
          .map(() => Array(canvasHeight).fill(false));
      };

      s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
      };

      s.draw = () => {
        // Draw the ellipse and fill/stroke.
        s.ellipse(x, y, settings.radius * 2, settings.radius * 2);
        s.fill(fill);
        s.stroke(stroke);

        // move the circle
        x = x - 10;
        y = y - 10;

        //enter right
        if (x > s.width) {
          x = 0;
        }
        //enter top
        if (y <= 0) {
          y = s.height;
        }

        // Jiggle the circle.
        x = x + s.random(-j, j);
        y = y + s.random(-j, j);

        // Ensure x and y are within the canvas bounds.
        const currentPixelX = Math.min(
          Math.max(Math.round(x), 0),
          canvasWidth - 1
        );
        const currentPixelY = Math.min(
          Math.max(Math.round(y), 0),
          canvasHeight - 1
        );

        // Iterate over the circle's area.
        for (let dx = -settings.radius; dx <= settings.radius; dx++) {
          for (let dy = -settings.radius; dy <= settings.radius; dy++) {
            // Calculate the actual coordinates of the pixel.
            const pixelX = currentPixelX + dx;
            const pixelY = currentPixelY + dy;

            // Check if the pixel is within the circle and the canvas.
            if (
              dx * dx + dy * dy <= settings.radius * settings.radius &&
              pixelX >= 0 &&
              pixelX < canvasWidth &&
              pixelY >= 0 &&
              pixelY < canvasHeight
            ) {
              // Mark the pixel as visited.
              visitedPixels[pixelX][pixelY] = true;
            }
          }
        }

        // Check if all pixels have been visited.
        const allVisited = visitedPixels.every((row) => row.every(Boolean));

        if (allVisited) {
          setGameResult("won");
          setGameLive(false);
        }

        // Make the circle loop around the canvas.
        if (x > s.width) x = 0;
        if (y > s.height) y = 0;
        if (x < 0) x = s.width;
        if (y < 0) y = s.height;
      };

      s.mousePressed = () => {
        console.log(visitedPixels);
        // let distance = s.dist(s.mouseX, s.mouseY, x, y);
        // if (distance < settings.radius) {
        //   if (fill === colour1) {
        //     setFill(colour2);
        //     setStroke(colour1);
        //   } else {
        //     setFill(colour1);
        //     setStroke(colour2);
        //   }
        // }
      };
    },
    [settings, setGameResult, setGameLive, setMessage]
  );

  return <ReactP5Wrapper sketch={sketch} />;
};

export default Level03;
