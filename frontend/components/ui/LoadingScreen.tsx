"use client";

import { useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Props = {
  intensity?: number;
  duration?: number;
  delayBetween?: number;
  className?: string;
};

export default function LoadingScreen({intensity = 10, duration = 0.5, delayBetween = 0.3, className=""}: Props) {
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      controls.set({ y: 0 });
      return;
    }
    let mounted = true;
    async function loop() {
      while (mounted) {
        await controls.start({ y: -intensity * 0.35, transition: { duration: duration * 0.35 } });
        await controls.start({ y: intensity, transition: { duration: duration * 0.45 } });
        await controls.start({ y: 0, transition: { duration: duration * 0.2 } });
        await new Promise((r) => setTimeout(r, Math.round(delayBetween * 1000)));
      }
    }
    loop();
    return () => {
      mounted = false;
      controls.stop();
    };
  }, [controls, intensity, duration, delayBetween, shouldReduceMotion]);

  return (
    <motion.span aria-hidden={shouldReduceMotion ? "true" : undefined} animate={controls} className={className} style={{ display: "inline-block" }}>
      <Image src="/logo.png" alt="Logo" width={200} height={200}/> 
    </motion.span>
  );
}
