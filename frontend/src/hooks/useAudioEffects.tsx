import { EffectInstance, EffectType, EffectTypeName } from "@/types/types";
import * as Tone from "tone";
import { SynthContext } from "@/contexts/SynthContext";
import { useContext, useCallback } from "react";


export const useAudioEffects = () => {
  const { synthRef, effects, setEffects } = useContext(SynthContext);

  const createEffectInstance = useCallback((effectName: EffectTypeName): EffectInstance | null => {
    switch (effectName) {
      case "Chorus":
        return new Tone.Chorus();
      case "Distortion":
        return new Tone.Distortion();
      case "Reverb":
        return new Tone.Reverb();
      case "Filter":
        return new Tone.Filter();
      case "Phaser":
        return new Tone.Phaser();
      default:
        return null;
    }
  }, []);

  const addEffect = useCallback((effectName: EffectTypeName, nickname?: string, settings?: object) => {
    try {
      if (!synthRef?.current) {
        throw new Error("No SynthRef Found");
      }

      if (!effects) {
        throw new Error("Effects Map Not Instanciated, please check SynthContext");
      }

      // Create the effect instance
      const effectInstance = createEffectInstance(effectName);
      if (!effectInstance) {
        throw new Error(`Invalid effect name: ${effectName}`);
      }

      // Apply settings if provided
      if (settings) {
        Object.assign(effectInstance, settings);
      }

      // Get or create the effect array for this effect type
      let effectsArr = effects.get(effectName);
      if (!effectsArr) {
        effectsArr = [];
        effects.set(effectName, effectsArr);
      }

      // Generate ID based on current array length (before adding)
      const id = effectsArr.length;

      // Create effect object
      const effectObj: EffectType = {
        id: id,
        instance: effectInstance,
        nickname: nickname || effectName,
        effectTypeName: effectName,
        settings: settings,
      };

      // Add to array
      effectsArr.push(effectObj);

      effects.set(effectName, effectsArr);
      const newEffects = new Map(effects);

      setEffects(newEffects);

      // Connect synth to effect, then effect to destination
      synthRef.current.disconnect(); // Disconnect from destination first
      synthRef.current.connect(effectInstance);
      effectInstance.toDestination();

      console.log("Effect added:", effectName, effectObj);
      console.log("effect", effects);
      console.log('effect.entries', effects.entries())
    } catch (error) {
      console.error("Error adding effect:", error);
    }
  }, [synthRef, effects, createEffectInstance]);

  const removeEffect = useCallback((effectName: EffectTypeName, id: number) => {
    try {
      if (!effects) {
        throw new Error("Effects Map Not Instanciated, please check SynthContext");
      }

      if (!effects.has(effectName)) {
        console.warn(`Effect type ${effectName} not found`);
        return;
      }

      const effectArray = effects.get(effectName);
      if (!effectArray || effectArray.length === 0) {
        console.warn(`Effect array for ${effectName} is empty`);
        return;
      }

      // Find and remove the effect
      const effectIndex = effectArray.findIndex((effect) => effect.id === id);
      if (effectIndex === -1) {
        console.warn(`Effect with id ${id} not found in ${effectName}`);
        return;
      }

      const effectToRemove = effectArray[effectIndex];

      // Dispose of the effect instance
      effectToRemove.instance.disconnect();
      effectToRemove.instance.dispose();

      // Remove from array
      effectArray.splice(effectIndex, 1);

      // Update the map
      if (effectArray.length === 0) {
        effects.delete(effectName);
      } else {
        effects.set(effectName, effectArray);
      }

      // Reconnect synth if there are no more effects
      if (synthRef?.current && effects.size === 0) {
        synthRef.current.toDestination();
      }

      console.log("Effect removed:", effectName, id);
    } catch (error) {
      console.error("Error removing effect:", error);
    }
  }, [synthRef, effects]);

  const getActiveEffects = useCallback(() => {
    if (effects) {
      console.log(effects);
      return effects;
    }
  }, [synthRef, effects]);


  return {
    addEffect,
    removeEffect,
    getActiveEffects,
    effects,
  };
};