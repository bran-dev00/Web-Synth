import { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { SynthTypes } from '@/types/types';

interface SynthSettings {
  volume: number;
  envelope?: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
  oscillator?: {
    type: string;
    frequency?: number;
    detune?: number;
  };
  filter?: {
    frequency: number;
    type: string;
    rolloff: number;
  };
  // Add more common parameters as needed
}

const defaultSettings: Record<string, SynthSettings> = {
  Synth: {
    volume: 0,
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.3,
      release: 1
    },
    oscillator: {
      type: 'sine'
    }
  },
  AMSynth: {
    volume: 0,
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.2,
      release: 0.5
    },
    oscillator: {
      type: 'sine'
    }
  },
  FMSynth: {
    volume: 0,
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.2,
      release: 0.5
    },
    oscillator: {
      type: 'sine'
    }
  },
  // Add more synth types with their default settings
};

export const useSynthSettings = (synth: SynthTypes | null) => {
  const [settings, setSettings] = useState<SynthSettings | null>(null);

  useEffect(() => {
    if (synth) {
      // Get current settings from synth
      const currentSettings = synth.get();
      setSettings(currentSettings as SynthSettings);
    }
  }, [synth]);

  const updateSetting = (key: string, value: any) => {
    if (synth && settings) {
      // Update the synth parameter
      synth.set({ [key]: value });
      
      // Update local state
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const resetToDefaults = () => {
    if (synth) {
      const synthType = synth.name;
      const defaults = defaultSettings[synthType];
      if (defaults) {
        synth.set(defaults);
        setSettings(defaults);
      }
    }
  };

  return {
    settings,
    updateSetting,
    resetToDefaults
  };
}; 