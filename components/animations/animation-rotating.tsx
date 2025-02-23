"use client";

import { motion } from "framer-motion";
import { Image } from "@heroui/image";
import { cn } from "@/lib/utils";

export const RotatingImage = ({ 
  src, 
  alt, 
  className, 
  rotation = 360, 
  duration = 20,
  initialRotation = 0,
  scale = [1, 1.1],
  rotationPath = "circular" 
}: {
  src: string;
  alt: string;
  className?: string;
  rotation?: number;
  duration?: number;
  initialRotation?: number;
  scale?: [number, number];
  rotationPath?: "circular" | "oscillate";
}) => {
  const getAnimationConfig = () => {
    if (rotationPath === "circular") {
      return {
        rotate: [initialRotation, initialRotation + rotation],
        scale: scale
      };
    }
    return {
      rotate: [initialRotation, initialRotation + rotation, initialRotation],
      scale: [scale[0], ...Array(Math.floor(duration/2)).fill(scale[1]), scale[0]]
    };
  };

  return (
    <motion.div
      animate={getAnimationConfig()}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: rotationPath === "circular" ? "linear" : "easeInOut",
        times: rotationPath === "circular" ? [0, 1] : [0, 0.5, 1]
      }}
      exit={{ opacity: 0, scale: 0 }}
      className={cn(className, "z-0")}
    >
      <Image src={src} alt={alt} className="w-full h-full" />
    </motion.div>
  );
};