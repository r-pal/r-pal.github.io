import { useForm, SubmitHandler } from "react-hook-form";
import { Colour } from "./Types";
import { useState } from "react";
import { colours } from "../constants/colours";
import clsx from "clsx";

export type Inputs = {
  radius: number;
  instances: number;
  colour: Colour;
  jiggliness: number;
};

type CircleSettingsProps = {
  setCircleSketch: (value: Inputs) => void;
};

const CircleSettings: React.FC<CircleSettingsProps> = ({ setCircleSketch }) => {
  const [selectedColourHex, setSelectedColourHex] = useState("#EDFFD9");
  const { register, handleSubmit, control } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setCircleSketch(data);
  };
  console.log(selectedColourHex);

  return (
    <div>
      <form id="settings" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col items-left gap-3">
          <div>
            Size
            <input
              type="range"
              step="50"
              min="10"
              max="1010"
              className="range range-md border-[#EDFFD9]"
              id="size"
              defaultValue={50}
              {...register("radius")}
            />
          </div>
          <div>
            Number
            <input
              type="range"
              step="1"
              min="1"
              max="100"
              className="range range-md"
              id="instances"
              defaultValue={1}
              {...register("instances")}
            />
          </div>
          <div className="flex-col">
            <div>Colour</div>
            <select
              {...register("colour")}
              className={clsx(
                `selectedColourHex && bg-[${selectedColourHex}]`
                // `selectedColourHex === 1 && text-bg-[#EDFFD9]`
              )}
              onChange={(e) => setSelectedColourHex(e.target.value)}
              value={selectedColourHex}
            >
              {colours.map((c) => (
                <option
                  key={c.id}
                  value={c.hex}
                  className={clsx(`bg-[${c.hex}]`)}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            Jiggly Factor
            <input
              type="range"
              step="1"
              min="1"
              max="10"
              defaultValue={1}
              className="range range-md"
              id="jigglyness"
              {...register("jiggliness")}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CircleSettings;
