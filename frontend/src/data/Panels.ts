import { PanelName, PanelType } from "@/types/types";
import fxIcon from "@/assets/fx.svg";
import EffectRack from "@/components/effects/effectsRack/EffectRack";

export const panels: Record<PanelName, PanelType> = {
    Effects: {
        name: "Effects",
        icon: fxIcon,
        description: "Add and modify audio effects to shape your sound.",
        content: EffectRack,
    },
};