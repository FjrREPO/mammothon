"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { CreatePoolForm, createPoolFormSchema } from "@/types/mutation/pool-manager/create-pool.form";
import SliderVariable from "./SliderVariable";
import { useEffect, useState } from "react";
import { useCreatePool } from "@/hooks/mutation/pool-manager/useCreatePool";
import Loading from "@/components/loader/loading";
import { Select, SelectItem } from "@heroui/select";
import { ADDRESS_USDC, ADDRESS_USDT } from "@/lib/constants";
import { Avatar } from "@heroui/avatar";

export function LaunchpadForm() {
  const { mutation } = useCreatePool();
  const [valueQuoteCurrency, setValueQuoteCurrency] = useState<Set<string>>(new Set([]));

  const [amounts, setAmounts] = useState({
    bottomAmount: 0.25,
    anchorAmount: 0.25,
    discoveryAmount: 0.25,
    allocationAmount: 0.25,
  });

  const [locked, setLocked] = useState({
    bottomAmount: false,
    anchorAmount: false,
    discoveryAmount: false,
    allocationAmount: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreatePoolForm>({
    resolver: zodResolver(createPoolFormSchema),
    defaultValues: {
      quoteCurrency: "",
      lotSize: 0,
      maxOrderAmount: 0,
      tokenName: "",
      tokenSymbol: "",
      tokenTotalSupply: 0,
      bottomAmount: 0.25,
      anchorAmount: 0.25,
      discoveryAmount: 0.25,
      allocationAmount: 0.25,
      bottomPrice: 0,
      anchorPrice: 0,
      discoveryPrice: 0
    },
  });

  useEffect(() => {
    const firstValue = Array.from(valueQuoteCurrency)[0];
    if (firstValue) {
      setValue("quoteCurrency", firstValue);
    }
  }, [valueQuoteCurrency, setValue]);

  const onSubmit = (data: CreatePoolForm) => {
    const calculateAmounts = (amounts: { bottomAmount: number, anchorAmount: number, discoveryAmount: number, allocationAmount: number }) => {
      const totalSupply = data.tokenTotalSupply;

      let bottomAmount = Math.round(amounts.bottomAmount * totalSupply);
      const anchorAmount = Math.round(amounts.anchorAmount * totalSupply);
      const discoveryAmount = Math.round(amounts.discoveryAmount * totalSupply);
      const allocationAmount = Math.round(amounts.allocationAmount * totalSupply);

      const totalRounded = bottomAmount + anchorAmount + discoveryAmount + allocationAmount;

      const diff = totalSupply - totalRounded;

      if (diff !== 0) {
        bottomAmount += diff;
      }

      return { bottomAmount, anchorAmount, discoveryAmount, allocationAmount };
    };

    mutation.mutate({
      quoteCurrency: valueQuoteCurrency as unknown as HexAddress,
      lotSize: data.lotSize,
      maxOrderAmount: data.maxOrderAmount,
      tokenName: data.tokenName,
      tokenSymbol: data.tokenSymbol,
      tokenTotalSupply: data.tokenTotalSupply,
      bottomAmount: calculateAmounts(amounts).bottomAmount,
      anchorAmount: calculateAmounts(amounts).anchorAmount,
      discoveryAmount: calculateAmounts(amounts).discoveryAmount,
      allocationAmount: calculateAmounts(amounts).allocationAmount,
      bottomPrice: data.bottomPrice,
      anchorPrice: data.anchorPrice,
      discoveryPrice: data.discoveryPrice,
      decimals: 18
    })
  };

  return (
    <>
      {mutation.isPending && (
        <Loading />
      )}
      <Form validationBehavior="aria" onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Card className="w-full">
          <CardBody className="flex flex-col">
            <CardHeader>
              <h2 className="text-lg font-semibold">Create Pool</h2>
            </CardHeader>
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <Select
                    isRequired
                    label="Qoute Currency"
                    placeholder="Select an quote currency"
                    selectedKeys={valueQuoteCurrency}
                    onSelectionChange={(keys) => 
                      setValueQuoteCurrency(new Set(Array.from(keys).map(String)))
                    }
                    defaultSelectedKeys={[ADDRESS_USDC]}
                  >
                    <SelectItem
                      key={ADDRESS_USDC}
                      value={ADDRESS_USDC}
                      startContent={
                        <Avatar alt="coin" className="w-6 h-6 min-w-6 min-h-6" src="/coin-usdc.png" />
                      }>
                      USDC
                    </SelectItem>
                    <SelectItem
                      key={ADDRESS_USDT}
                      value={ADDRESS_USDT}
                      startContent={
                        <Avatar alt="coin" className="w-6 h-6 min-w-6 min-h-6" src="/coin-usdt.png" />
                      }
                    >
                      USDT
                    </SelectItem>
                  </Select>
                  {errors.quoteCurrency && <p className="text-sm text-red-500">{errors.quoteCurrency.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    type="number"
                    label="Lot Size"
                    placeholder="Enter lot size"
                    {...register("lotSize", { valueAsNumber: true })}
                  />
                  {errors.lotSize && <p className="text-sm text-red-500">{errors.lotSize.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    type="number"
                    label="Max Order Amount"
                    placeholder="Enter max order amount"
                    {...register("maxOrderAmount", { valueAsNumber: true })}
                  />
                  {errors.maxOrderAmount && <p className="text-sm text-red-500">{errors.maxOrderAmount.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    label="Token Name"
                    placeholder="Enter token name"
                    {...register("tokenName")}
                  />
                  {errors.tokenName && <p className="text-sm text-red-500">{errors.tokenName.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    label="Token Symbol"
                    placeholder="Enter token symbol"
                    {...register("tokenSymbol")}
                  />
                  {errors.tokenSymbol && <p className="text-sm text-red-500">{errors.tokenSymbol.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    label="Total Supply"
                    placeholder="Enter total supply"
                    {...register("tokenTotalSupply", { valueAsNumber: true })}
                  />
                  {errors.tokenTotalSupply && <p className="text-sm text-red-500">{errors.tokenTotalSupply.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    label="Bottom Price"
                    placeholder="Enter bottom price"
                    {...register("bottomPrice", { valueAsNumber: true })}
                  />
                  {errors.bottomPrice && <p className="text-sm text-red-500">{errors.bottomPrice.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    label="Anchor Price"
                    placeholder="Enter anchor price"
                    {...register("anchorPrice", { valueAsNumber: true })}
                  />
                  {errors.anchorPrice && <p className="text-sm text-red-500">{errors.anchorPrice.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    label="Discovery Price"
                    placeholder="Enter discovery price"
                    {...register("discoveryPrice", { valueAsNumber: true })}
                  />
                  {errors.discoveryPrice && <p className="text-sm text-red-500">{errors.discoveryPrice.message}</p>}
                </div>
              </div>
              <SliderVariable
                amounts={amounts}
                setAmounts={setAmounts}
                locked={locked}
                setLocked={setLocked}
              />
              <div className="mt-4">
                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  Launch Token
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Form >
    </>
  );
}
