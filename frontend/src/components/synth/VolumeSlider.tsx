import { useState } from "react";
import { SynthInstance } from "@/types/types";

interface VolumeSliderProps {
  synth: SynthInstance | null | undefined;
}


//TODO: Reset Volume on synth change (may have to change this in the change synth context file)
const VolumeSlider: React.FC<VolumeSliderProps> = ({ synth }) => {
  const [volume, setVolume] = useState<number>(0);
  const VOLUME_INTERVAL = 0.15;

  const handleVolumeChange = (newValue: number) => {
    //UI
    setVolume(newValue);
    if (synth) {
      if (newValue <= 0) {
        synth.volume.value = 0;
      } else if (newValue >= 100) {
        synth.volume.value = VOLUME_INTERVAL * 100;
      } else {
        synth.volume.value = VOLUME_INTERVAL * newValue;
      }
    }
  };

  return (
    <div>
      <h1>Volume Slider</h1>

      <p>{volume}</p>
    </div>
  );
};

export default VolumeSlider;
