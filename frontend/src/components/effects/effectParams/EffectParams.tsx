import { useState } from "react"
import { EffectInstance, EffectTypeName } from "@/types/types"
import { EFFECT_CONFIGS } from "@/config/effectSchema"
import Knob from "@/components/shared/controls/Knob"
import styles from "./EffectParams.module.css"

const EffectParams = ({ effectName, effectInstance }: { effectName: EffectTypeName, effectInstance: EffectInstance }) => {

    const getInitialParameterValues = () => {
        const initialValues: Record<string, number | string> = {};
        const configParams = EFFECT_CONFIGS[effectName].params;
        const currentValues = effectInstance.get() as Record<string, any>;

        configParams.forEach(({ property, type, min, options }) => {
            const rawValue = property.split('.').reduce((obj, key) => obj?.[key], currentValues);
            if (typeof rawValue === "number" || typeof rawValue === "string") {
                initialValues[property] = rawValue;
            } else if (type === "number") {
                initialValues[property] = min ?? 0;
            } else {
                initialValues[property] = options?.[0] ?? "";
            }
        });

        return initialValues;
    };

    const [paramValues, setParamValues] = useState<Record<string, number | string>>(getInitialParameterValues);

    const handleOnChange = (effectInstance: EffectInstance, property: string, newValue: string | number, type: string, step?: number) => {
        let valueToSet: string | number = type === "number" ? parseFloat(String(newValue)) : newValue;

        if (type === "number" && step) {
            const precision = Math.max(0, Math.ceil(-Math.log10(step)));
            valueToSet = parseFloat(Number(valueToSet).toFixed(precision));
        }

        setParamValues(prev => ({
            ...prev,
            [property]: valueToSet,
        }));

        if (property.includes('.')) {
            const [obj, prop] = property.split('.');
            ; (effectInstance as any)[obj].set({ [prop]: valueToSet });
        } else {
            effectInstance.set({ [property]: valueToSet });
        }
    }

    return (
        <>
            {/* Makes sure knobs are placed first */}
            {[...EFFECT_CONFIGS[effectName].params].sort((a, b) => (a.type === "select" ? 1 : 0) - (b.type === "select" ? 1 : 0)).map(({ label, options, property, min, max, type, step, control, knobSize, startDeg, endDeg }, index) =>
            (
                <div className={`${styles["wrapper"]}${type === "select" ? " " + styles["full-width"] : ""}`} key={index}>
                    <label className={styles["label"]} htmlFor={property}>{label}</label>
                    {
                        type == "number" ?
                            control !== "slider" ?
                                (
                                    <div className={styles["control"]}>
                                        <Knob
                                            size={knobSize ?? 40}
                                            min={min ?? 0}
                                            max={max ?? 1}
                                            startDeg={startDeg ?? -135}
                                            endDeg={endDeg ?? 135}
                                            step={step}
                                            value={Number(paramValues[property])}
                                            onChange={(newValue) => handleOnChange(effectInstance, property, newValue, type, step)}
                                        />
                                        <input
                                            className={styles["value-input"]}
                                            type="number"
                                            min={min}
                                            max={max}
                                            step={step}
                                            value={Number(paramValues[property])}
                                            onChange={(e) => handleOnChange(effectInstance, property, e.target.value, type, step)}
                                            title={`Range: ${min} – ${max}`}
                                        />
                                        {min !== undefined && max !== undefined && (
                                            <span className={styles["range-hint"]}>{min}–{max}</span>
                                        )}
                                    </div>
                                ) :
                                (
                                    <div className={styles["control"]}>
                                        <input
                                            id={property}
                                            name={property}
                                            value={paramValues[property] as number | string}
                                            onChange={(e) => handleOnChange(effectInstance, property, e.target.value, type, step)}
                                            min={min}
                                            max={max}
                                            type="range"
                                            step={step}
                                        />
                                        <input
                                            className={styles["value-input"]}
                                            type="number"
                                            min={min}
                                            max={max}
                                            step={step}
                                            value={Number(paramValues[property])}
                                            onChange={(e) => handleOnChange(effectInstance, property, e.target.value, type, step)}
                                            title={`Range: ${min} – ${max}`}
                                        />
                                        {min !== undefined && max !== undefined && (
                                            <span className={styles["range-hint"]}>{min}–{max}</span>
                                        )}
                                    </div>
                                )
                            :
                            (
                                <select id={property} onChange={(e) => handleOnChange(effectInstance, property, e.target.value, type)}>
                                    {options?.map((name, idx) => (
                                        <option value={name} key={idx}>{name}</option>
                                    ))}
                                </select>
                            )
                    }
                </div>
            )
            )}

        </>
    )
}

export default EffectParams