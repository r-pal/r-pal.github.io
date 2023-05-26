import { useCallback, useEffect } from "react";
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
  const r = settings.radius;
  useEffect(() => {
    setMessage("Large screen = large wait");
  }, []);

  const sketch = useCallback(
    (s: P5CanvasInstance) => {
      let x: number;
      let y: number;
      // Initialize visitedPixels as a 2D array with the same size as the canvas.
      // block size is 10 pixels to speed up process
      let visitedPixels: boolean[][];
      const blockSize = 10;
      visitedPixels = Array(Math.ceil(canvasWidth / blockSize))
        .fill(false)
        .map(() => Array(Math.ceil(canvasHeight / blockSize)).fill(false));

      s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight);
        x = Math.round(s.random(0, s.width));
        y = Math.round(s.random(0, s.height));
      };

      s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
      };

      s.draw = () => {
        s.ellipse(x, y, r * 2, r * 2);
        s.fill(settings.colour1);
        s.stroke(settings.colour2);

        // move the circle, and loop around the canvas
        x = x + 5;
        y = y - 5;
        if (x > s.width) x = 0;
        if (y > s.height) y = 0;
        if (x < 0) x = s.width;
        if (y < 0) y = s.height;

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
        for (let i = -r; i <= r; i++) {
          for (let j = -r; j <= r; j++) {
            // Calculate the actual coordinates of the pixel.
            const pixelX = currentPixelX + i;
            const pixelY = currentPixelY + j;

            // Check if the pixel is within the circle and the canvas.
            if (
              i * i + j * j <= r * r &&
              pixelX >= 0 &&
              pixelX < canvasWidth &&
              pixelY >= 0 &&
              pixelY < canvasHeight
            ) {
              // Mark the pixel as visited.
              visitedPixels[Math.floor(pixelX / blockSize)][
                Math.floor(pixelY / blockSize)
              ] = true;
            }
          }
        }

        // Check if all pixels have been visited.
        const allVisited = visitedPixels.every((row) => row.every(Boolean));

        if (allVisited) {
          setGameResult("won");
          setGameLive(false);
          setMessage("");
        }
      };
    },
    [settings, setGameResult, setGameLive, setMessage]
  );

  return <ReactP5Wrapper sketch={sketch} />;
};

export default Level03;
