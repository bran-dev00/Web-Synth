import { EffectSchema } from "@/types/types";

export const EFFECT_CONFIGS: Record<string, EffectSchema> = {
    Chorus: {
        name: "Chorus",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, step: 0.01, type: "number" },
            { label: "Frequency", property: "frequency", max: 20, min: 0.1, step: 0.2, type: "number" },
            { label: "Delay Time", property: "delayTime", max: 20, min: 0, step: 0.2, type: "number" },
            { label: "Depth", property: "depth", max: 1, min: 0, step: 0.01, type: "number" },
            { label: "Spread", property: "spread", max: 180, min: 0, step: 2, type: "number" },
            { label: "Wave Type", property: "type", type: "select", options: ["sine", "square", "triangle", "sawtooth"] },
            { label: "Feedback", property: "feedback", max: 1, min: 0, step: 0.01, type: "number" },
        ]
    },
    Reverb: {
        name: "Reverb",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, step: 0.01, type: "number" },
            { label: "Decay", property: "decay", max: 10, min: 0.1, step: 0.1, type: "number" },
            { label: "Pre-Delay", property: "preDelay", max: 1, min: 0, step: 0.01, type: "number" },
        ]
    },
    Distortion: {
        name: "Distortion",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, step: 0.01, type: "number" },
            { label: "Distortion", property: "distortion", max: 1, min: 0, step: 0.01, type: "number" },
            { label: "Oversample", property: "oversample", type: "select", options: ["none", "2x", "4x"] },
        ]
    },
    AutoFilter: {
        name: "AutoFilter",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, step: 0.01, type: "number" },
            { label: "Frequency", property: "frequency", max: 20, min: 0.1, step: 0.2, type: "number" },
            { label: "Depth", property: "depth", max: 1, min: 0, step: 0.01, type: "number" },
            { label: "Base Frequency", property: "baseFrequency", max: 20000, min: 20, step: 200, type: "number" },
            { label: "Octaves", property: "octaves", max: 8, min: 0, step: 1, type: "number" },
            { label: "Type", property: "type", type: "select", options: ["sine", "square", "triangle", "sawtooth"] },
            { label: "Filter Type", property: "filter.type", type: "select", options: ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"] },
            { label: "Q", property: "filter.Q", max: 10, min: 0, step: 0.1, type: "number" },
            { label: "Rolloff", property: "filter.rolloff", type: "select", options: ["-12", "-24", "-48"] },        ]
    },
    Delay: {
        name: "Delay",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, step: 0.01, type: "number" },
            { label: "Delay Time", property: "delayTime", max: 1, min: 0, step: 0.01, type: "number" },
            { label: "Feedback", property: "feedback", max: 1, min: 0, step: 0.01, type: "number" },
        ]
    },
}