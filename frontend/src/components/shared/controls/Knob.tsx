import React, { useCallback, useEffect, useRef } from "react";
import styles from "./Knob.module.css"

type KnobProps = {
    size: number
    min: number;
    max: number;
    startDeg: number;
    endDeg: number;
    value: number;
    step?: number;
    onChange: (value: number) => void;
}

const Knob = ({ size, startDeg, endDeg, value, onChange, min, max, step }: KnobProps) => {

    const polarToXY = (
        cx: number,
        cy: number,
        r: number,
        angleDeg: number): { x: number; y: number; } => {

        const a = ((angleDeg - 90) * Math.PI) / 180;
        return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    }

    const arcPath = (
        cx: number,
        cy: number,
        r: number,
        startDeg: number,
        endDeg: number
    ): string => {

        const start = polarToXY(cx, cy, r, startDeg);
        const end = polarToXY(cx, cy, r, endDeg);
        const large = endDeg - startDeg > 180 ? 1 : 0;

        return `M${start.x.toFixed(3)}, ${start.y.toFixed(3)} A${r}, ${r}, 0, ${large},1,${end.x.toFixed(3)}, ${end.y.toFixed(3)}`;
    }

    const clamp = (v: number, min: number, max: number): number => {
        return Math.min(max, Math.max(min, v));
    }

    const normalizeAngle = (angle: number): number => {
        if (angle > 180) return angle - 360;
        if (angle <= -180) return angle + 360;
        return angle;
    };

    const getPointerAngle = (clientX: number, clientY: number): number => {
        const rect = svgRef.current!.getBoundingClientRect();
        const px = clientX - rect.left - cx;
        const py = clientY - rect.top - cy;
        const angle = (Math.atan2(py, px) * 180) / Math.PI + 90;
        return normalizeAngle(angle);
    };

    const clampAngle = (angle: number, start: number, end: number): number => {
        return Math.min(Math.max(angle, start), end);
    };

    const applyStep = (value: number): number => {
        if (!step || step <= 0) return value;
        return Math.round(value / step) * step;
    };

    const angleToValue = (angle: number): number => {
        const clampedAngle = clampAngle(angle, startDeg, endDeg);
        const t = (clampedAngle - startDeg) / arcRange;
        const rawValue = min + t * (max - min);
        return clamp(applyStep(rawValue), min, max);
    };

    const cx = size / 2;
    const cy = size / 2;
    const r = size * .35;
    const strokeWidth = size * .075;
    const dotR = strokeWidth * .55;
    const arcRange = endDeg - startDeg;

    const t = (value - min) / (max - min);
    const currentAngle = startDeg + t * arcRange;
    const dotPos = polarToXY(cx, cy, r, currentAngle);

    const fillD =
        Math.abs(currentAngle - startDeg) < 0.5
            ? ""
            : arcPath(cx, cy, r, startDeg, currentAngle);


    const drag = useRef<{ active: boolean }>({
        active: false,
    });

    const svgRef = useRef<SVGSVGElement>(null);

    const handlePointerDown = useCallback(
        (e: React.PointerEvent<SVGSVGElement>) => {
            e.preventDefault();
            svgRef.current!.setPointerCapture(e.pointerId);
            const angle = getPointerAngle(e.clientX, e.clientY);

            drag.current = {
                active: true,
            };

            onChange(angleToValue(angle));
        },
        [getPointerAngle, angleToValue, onChange]
    )


    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            if (!drag.current.active) return;

            e.preventDefault();
            const angle = getPointerAngle(e.clientX, e.clientY);
            onChange(angleToValue(angle));
        }

        const onUp = () => {
            drag.current = { active: false };
        }

        window.addEventListener("pointermove", onMove, { passive: false });
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", onUp);

        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
        };
    }, [min, max, arcRange, getPointerAngle, angleToValue, onChange]
    );


    return (

        <svg
            className={styles.knob}
            ref={svgRef}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size} `}
            onPointerDown={handlePointerDown}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            role="slider"
        >
            <circle className={styles["knob-base"]}
                cx={cx}
                cy={cy}
                r={r}
                strokeWidth={r + strokeWidth / 2 + 4}
            />

            <path
                d={arcPath(cx, cy, r, startDeg, endDeg)}
                className={styles["knob-track"]}
                strokeWidth={strokeWidth}
            />

            {fillD && (
                <path
                    d={fillD}
                    className={styles["knob-track-active"]}
                    strokeWidth={strokeWidth}
                />
            )}

            <circle
                className={styles["dot"]}
                cx={dotPos.x}
                cy={dotPos.y}
                r={dotR}
                strokeWidth={dotR * 0.7}
            />


        </svg>
    )
}

export default Knob