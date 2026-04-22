import { EffectSchema } from "@/types/types";

export const EFFECT_CONFIGS: Record<string, EffectSchema> = {
    Chorus: {
        name: "Chorus",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, type: "number" },
            { label: "Frequency", property: "frequency", max: 10, min: 0.1, type: "number" },
            { label: "Delay Time", property: "delayTime", max: 20, min: 0, type: "number" },
            { label: "Depth", property: "depth", max: 1, min: 0, type: "number" },
            { label: "Spread", property: "spread", max: 180, min: 0, type: "number" },
        ]
    },
    Reverb: {
        name: "Reverb",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, type: "number" },
            { label: "Decay", property: "decay", max: 10, min: 0.1, type: "number" },
            { label: "Pre-Delay", property: "preDelay", max: 1, min: 0, type: "number" },
        ]
    },
    Distortion: {
        name: "Distortion",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, type: "number" },
            { label: "Distortion", property: "distortion", max: 1, min: 0, type: "number" },
        ]
    },
    Filter: {
        name: "Filter",
        params: [
            { label: "Frequency", property: "frequency", max: 20000, min: 20, type: "number" },
            { label: "Q", property: "Q", max: 10, min: 0.01, type: "number" },
            { label: "Gain", property: "gain", max: 12, min: -12, type: "number" },
            { label: "Rolloff", property: "rolloff", type: "select", options: ["-12", "-24", "-48", "-96"] },
            { label: "Type", property: "type", type: "select", options: ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"] },
        ]
    },
    Delay: {
        name: "Delay",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, type: "number" },
            { label: "Delay Time", property: "delayTime", max: 1, min: 0, type: "number" },
        ]
    },
}