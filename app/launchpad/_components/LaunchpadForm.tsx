"use client";

import { ArrowUp, Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { DECIMALS_TOKEN } from "@/lib/constants";
import { Form } from "@heroui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTokenForm, createTokenFormSchema } from "@/types/mutation/create-token.form";
import { motion } from "framer-motion";

export function LaunchpadForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTokenForm>({
    resolver: zodResolver(createTokenFormSchema),
    defaultValues: {
      name: "",
      symbol: "",
      totalSupply: 0,
    },
  });

  const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
    setValue("totalSupply", Number(rawValue));
  };

  const onSubmit = (data: CreateTokenForm) => {
    console.log("Form Data:", data);
  };

  return (
    <Form validationBehavior="aria" onSubmit={handleSubmit(onSubmit)} className="w-full">
      <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 w-full">
        <motion.li
          className={`min-h-[14rem] list-none md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
            <GlowingEffect
              blur={0}
              borderWidth={3}
              spread={80}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
              <div className="relative flex flex-1 flex-col justify-between gap-3">
                <div className="w-fit rounded-lg border border-gray-600 p-2 ">
                  <Box className="h-4 w-4 text-black dark:text-neutral-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                    Token Name
                  </h3>
                  <Input {...register("name")} placeholder="e.g: Ethereum" variant="bordered" color="warning" />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
              </div>
            </div>
          </div>
        </motion.li>

        <motion.li
          className={`min-h-[14rem] list-none md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
            <GlowingEffect
              blur={0}
              borderWidth={3}
              spread={80}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
              <div className="relative flex flex-1 flex-col justify-between gap-3">
                <div className="w-fit rounded-lg border border-gray-600 p-2 ">
                  <Settings className="h-4 w-4 text-black dark:text-neutral-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                    Token Symbol
                  </h3>
                  <Input {...register("symbol")} placeholder="e.g: ETH" variant="bordered" color="warning" />
                  {errors.symbol && <p className="text-red-500">{errors.symbol.message}</p>}
                </div>
              </div>
            </div>
          </div>
        </motion.li>

        <motion.li
          className={`min-h-[14rem] list-none md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
            <GlowingEffect
              blur={0}
              borderWidth={3}
              spread={80}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
              <div className="relative flex flex-1 flex-col justify-between gap-3">
                <div className="w-fit rounded-lg border border-gray-600 p-2 ">
                  <Lock className="h-4 w-4 text-black dark:text-neutral-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                    Total Supply
                  </h3>
                  <Input type="text" value={formatNumber(watch("totalSupply").toString())} onChange={handleChange} variant="bordered" color="warning" placeholder="e.g: 1,000,000,000" />
                  {errors.totalSupply && <p className="text-red-500">{errors.totalSupply.message}</p>}
                </div>
              </div>
            </div>
          </div>
        </motion.li>

        <motion.li
          className={`min-h-[14rem] list-none md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
            <GlowingEffect
              blur={0}
              borderWidth={3}
              spread={80}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
              <div className="relative flex flex-1 flex-col justify-between gap-3">
                <div className="w-fit rounded-lg border border-gray-600 p-2 ">
                  <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                    Decimals
                  </h3>
                  <h2
                    className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
                md:text-base/[1.375rem]  text-black dark:text-neutral-400"
                  >
                    {DECIMALS_TOKEN} (default decimals)
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </motion.li>

        <motion.li
          className={`min-h-[14rem] list-none md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
            <GlowingEffect
              blur={0}
              borderWidth={3}
              spread={80}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
              <div className="relative flex flex-1 flex-col justify-between gap-3">
                <div className="w-fit rounded-lg border border-gray-600 p-2 ">
                  <Search className="h-4 w-4 text-black dark:text-neutral-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                    Deploy Now
                  </h3>
                  <Button type="submit" variant="ghost" color="success">
                    <ArrowUp className="w-4 h-4" />Deploy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.li>
      </ul>
    </Form>
  );
}
