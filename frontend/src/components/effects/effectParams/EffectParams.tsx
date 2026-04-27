import { useState } from "react"
import { EffectInstance, EffectSchema, EffectTypeName } from "@/types/types"
import { EFFECT_CONFIGS } from "@/config/effectSchema"
import styles from "./EffectParams.module.css"

const EffectParams = ({ effectName, effectInstance }: { effectName: EffectTypeName, effectInstance: EffectInstance }) => {

    const [value, setValue] = useState<number | string>(0)

    const handleOnChange = (effectInstance: EffectInstance, property: string, newValue: string, type: string) => {
        setValue(newValue)
        const valueToSet = type === "number" ? parseFloat(newValue) : newValue
        if (property.includes('.')) {
            const [obj, prop] = property.split('.')
                ; (effectInstance as any)[obj].set({ [prop]: valueToSet })
        } else {
            effectInstance.set({ [property]: valueToSet })
        }
    }

    return (
        <>
            {EFFECT_CONFIGS[effectName].params.map(({ label, options, property, min, max, type, step }, index) =>
            (
                <div className={styles["wrapper"]} key={index}>
                    <label className={styles["label"]} htmlFor={property}>{label}</label>
                    {
                        type == "number" ?
                            (
                                <input name={property} onChange={(e) => handleOnChange(effectInstance, property, e.target.value, type)} min={min} max={max} type="range" step={step} />
                            ) :
                            (
                                <select onChange={(e) => handleOnChange(effectInstance, property, e.target.value, type)}>
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