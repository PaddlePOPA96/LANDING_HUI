'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

interface Props {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    duration?: number;
    className?: string;
    variant?: "fade-up" | "fade-in" | "slide-in-right" | "slide-in-left";
}

export const Reveal = ({
    children,
    width = "fit-content",
    delay = 0.25,
    duration = 0.5,
    className = "",
    variant = "fade-up"
}: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const variants: Record<string, { hidden: Variant; visible: Variant }> = {
        "fade-up": {
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
        },
        "fade-in": {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        "slide-in-right": {
            hidden: { opacity: 0, x: 75 },
            visible: { opacity: 1, x: 0 },
        },
        "slide-in-left": {
            hidden: { opacity: 0, x: -75 },
            visible: { opacity: 1, x: 0 },
        }
    };

    const selectedVariant = variants[variant] || variants["fade-up"];

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={selectedVariant}
                initial="hidden"
                animate={mainControls}
                transition={{ duration, delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};
