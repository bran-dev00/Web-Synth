import { useContext, useState, useEffect } from "react";
import { SynthContext } from "@/contexts/SynthContext";
import { SynthTypes } from "@/types/types";
import { Envelope } from "tone";
import * as Tone from "tone";
import { ul } from "framer-motion/m";

interface SynthSettingTypes extends Tone.SynthOptions {
  volume: number;
  envelope: any;
  portamento: number;
}
interface synthSettingsProps {
  [key: string]: any;
}

const SynthSettings = () => {
  const { synthRef } = useContext(SynthContext);
  const synth: SynthTypes | null = synthRef?.current;

  const env = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 1.0,
    release: 0.8,
  });
  const settings: SynthSettingTypes = {
    volume: synth?.volume.value,
    envelope: synth?.envelope | null | undefined,
  };
  const testSettings = {
    ...synth?.get(),
  };

  const RenderSynthSettings: React.FC<synthSettingsProps> = ({ data }) => {
    return (
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong>{" "}
            {typeof value === "object" && value !== null
              ? JSON.stringify(value) // Or recursively render if needed
              : value}
          </li>
        ))}
      </ul>
    );
  };

  if (synth) {
    synth.debug = true;
    {
      /* console.log(synth.get());
       */
    }
    {
      /*
     if (synth?.envelope) {
      console.log("envelope: ", synth?.envelope);
    }

    */
    }
  }

  console.log("TEST", testSettings);
  // List of synth settings: volume, envelope properties
  return (
    <div>
      <h1>Synth Settings</h1>
      <RenderSynthSettings data={testSettings} />
    </div>
  );
};

export default SynthSettings;
