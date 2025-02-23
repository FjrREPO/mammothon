"use client";

import { subtitle } from "@/components/primitives";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LaunchpadForm } from "./_components/LaunchpadForm";

export default function Page() {
  return (
    <div className="py-5 pt-24 overflow-x-hidden w-full">
      <div className="flex flex-col gap-5 items-start">
        <div className="flex flex-col items-start justify-start pb-5">
          <motion.span
            className={cn(subtitle({ sizeText: "txl" }), "font-bold text-start")}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Launchpad
          </motion.span>
          <motion.span
            className={cn(subtitle(), "text-start")}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Launch your new token here.
          </motion.span>
        </div>
      </div>
      <LaunchpadForm />
    </div>
  );
}
