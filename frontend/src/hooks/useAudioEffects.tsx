import { EffectInstance, EffectType, EffectTypeName } from "@/types/types";
import * as Tone from "tone";
import { SynthContext } from "@/contexts/SynthContext";
import { useContext, useCallback } from "react";


export const useAudioEffects = () => {
  const { synthRef, effectChain, setEffectChain } = useContext(SynthContext);

  const createEffectInstance = useCallback((effectName: EffectTypeName): EffectInstance | null => {
    switch (effectName) {
      case "Chorus":
        return new Tone.Chorus();
      case "Distortion":
        return new Tone.Distortion();
      case "Reverb":
        return new Tone.Reverb();
      case "AutoFilter":
        return new Tone.AutoFilter();
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

      if (!effectChain) {
        throw new Error("The Effects Chain is Not Instanciated, please check SynthContext");
      }

      const effectInstance = createEffectInstance(effectName);
      if (!effectInstance) {
        throw new Error(`Invalid effect name: ${effectName}`);
      }

      // Apply settings if provided
      if (settings) {
        Object.assign(effectInstance, settings);
      }

      //TODO: get a better id gen system
      const id = effectChain.length;

      const effectObj: EffectType = {
        id: id,
        instance: effectInstance,
        nickname: nickname || effectName,
        effectTypeName: effectName,
        settings: settings,
      };

      const newArr = [...effectChain, effectObj];
      setEffectChain(newArr);

      // Reconnect the audio chain using the new chain
      synthRef.current.disconnect();
      let currentNode: Tone.ToneAudioNode = synthRef.current;

      for (const effect of newArr) {
        currentNode.connect(effect.instance);
        currentNode = effect.instance;
      }

      currentNode.toDestination();

      console.log("Effect added:", effectName, effectObj);
    } catch (error) {
      console.error("Error adding effect:", error);
    }
  }, [synthRef, effectChain, createEffectInstance]);

  const removeEffect = useCallback((id: number) => {
    try {
      const effectIndex = effectChain.findIndex((effect) => effect.id === id);
      if (effectIndex === -1) {
        console.warn(`Effect with id ${id} not found`);
        return;
      }

      const effectToRemove = effectChain[effectIndex];

      // Dispose of the effect instance
      effectToRemove.instance.disconnect();
      effectToRemove.instance.dispose();

      // Update effectChain
      const newChain = effectChain.filter((effect) => effect.id !== id);
      setEffectChain(newChain);

      // Reconnect synth if there are no more effects
      if (!synthRef?.current) return;

      if (newChain.length === 0) {
        synthRef.current.toDestination();
      } else {
        // Reconnect the audio chain using the new chain
        synthRef.current.disconnect();
        let currentNode: Tone.ToneAudioNode = synthRef.current;
        for (const effect of newChain) {
          currentNode.connect(effect.instance);
          currentNode = effect.instance;
        }
        currentNode.toDestination();
      }

      console.log("Effect removed:", id);
    } catch (error) {
      console.error("Error removing effect:", error);
    }
  }, [synthRef, effectChain]);

  const getActiveEffects = useCallback(() => {
    return effectChain;
  }, [effectChain]);

  return {
    addEffect,
    removeEffect,
    getActiveEffects,
  };
};