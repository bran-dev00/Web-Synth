import { useContext } from "react";
import { SynthContext } from "@/contexts/SynthContext";
import { useSynthSettings } from "@/hooks/useSynthSettings";

const SynthSettings = () => {
  const { synthRef } = useContext(SynthContext);
  const { settings, updateSetting, resetToDefaults } = useSynthSettings(synthRef?.current);

  if (!settings) return null;

  return (
    <div className="synth-settings">
      <h2>Synth Settings</h2>
      
      {/* Volume Control */}
      <div className="setting-group">
        <h3>Volume</h3>
              </div>

      {/* Envelope Controls */}
      {settings.envelope && (
        <div className="setting-group">
          <h3>Envelope</h3>
          <div className="envelope-controls">
            <div>
              <label>Attack</label>
                          </div>
            <div>
              <label>Decay</label>
              
            </div>
            <div>
              <label>Sustain</label>
            </div>
            <div>
              <label>Release</label>
            </div>
          </div>
        </div>
      )}

      {/* Oscillator Controls */}
      {settings.oscillator && (
        <div className="setting-group">
          <h3>Oscillator</h3>
          <select
            value={settings.oscillator.type}
            onChange={(e) => updateSetting('oscillator.type', e.target.value)}
          >
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>
      )}

      <button onClick={resetToDefaults}>Reset to Defaults</button>
    </div>
  );
};

export default SynthSettings;
