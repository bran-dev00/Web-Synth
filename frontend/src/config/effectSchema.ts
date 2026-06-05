import { EffectSchema } from "@/types/types";

const knobDefaults = {
    control: "knob" as const,
    knobSize: 40,
    startDeg: -135,
    endDeg: 135,
};

export const EFFECT_CONFIGS: Record<string, EffectSchema> = {
    Chorus: {
        name: "Chorus",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, step: 0.01, type: "number", ...knobDefaults },
            { label: "Frequency", property: "frequency", max: 20, min: 0.1, step: 0.2, type: "number", ...knobDefaults },
            { label: "Delay Time", property: "delayTime", max: 20, min: 0, step: 0.2, type: "number", ...knobDefaults },
            { label: "Depth", property: "depth", max: 1, min: 0, step: 0.01, type: "number", ...knobDefaults },
            { label: "Spread", property: "spread", max: 180, min: 0, step: 2, type: "number", ...knobDefaults },
            { label: "Wave Type", property: "type", type: "select", options: ["sine", "square", "triangle", "sawtooth"] },
            { label: "Feedback", property: "feedback", max: 1, min: 0, step: 0.01, type: "number", ...knobDefaults },
        ]
    },
    Reverb: {
        name: "Reverb",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, step: 0.01, type: "number", ...knobDefaults },
            { label: "Decay", property: "decay", max: 10, min: 0.1, step: 0.1, type: "number", ...knobDefaults },
            { label: "Pre-Delay", property: "preDelay", max: 1, min: 0, step: 0.01, type: "number", ...knobDefaults },
        ]
    },
    Distortion: {
        name: "Distortion",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, step: 0.01, type: "number", ...knobDefaults },
            { label: "Distortion", property: "distortion", max: 1, min: 0, step: 0.01, type: "number", ...knobDefaults },
            { label: "Oversample", property: "oversample", type: "select", options: ["none", "2x", "4x"] },
        ]
    },
    AutoFilter: {
        name: "AutoFilter",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, step: 0.01, type: "number", ...knobDefaults },
            { label: "Frequency", property: "frequency", max: 20, min: 0.1, step: 0.2, type: "number", ...knobDefaults },
            { label: "Depth", property: "depth", max: 1, min: 0, step: 0.01, type: "number", ...knobDefaults },
            { label: "Base Frequency", property: "baseFrequency", max: 20000, min: 20, step: 200, type: "number", ...knobDefaults },
            { label: "Octaves", property: "octaves", max: 8, min: 0, step: 1, type: "number", ...knobDefaults },
            { label: "Type", property: "type", type: "select", options: ["sine", "square", "triangle", "sawtooth"] },
            { label: "Filter Type", property: "filter.type", type: "select", options: ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"] },
            { label: "Q", property: "filter.Q", max: 10, min: 0, step: 0.1, type: "number", ...knobDefaults },
            { label: "Rolloff", property: "filter.rolloff", type: "select", options: ["-12", "-24", "-48"] },
        ]
    },
    Delay: {
        name: "Delay",
        params: [
            { label: "Wet", property: "wet", max: 1, min: 0, step: 0.01, type: "number", ...knobDefaults },
            { label: "Delay Time", property: "delayTime", max: 1, min: 0, step: 0.01, type: "number", ...knobDefaults },
            { label: "Feedback", property: "feedback", max: 1, min: 0, step: 0.01, type: "number", ...knobDefaults },
        ]
    },
}
