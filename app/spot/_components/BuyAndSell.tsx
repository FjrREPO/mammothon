import React, { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardBody } from "@heroui/card";

export default function BuyAndSell() {
  const [selected, setSelected] = useState<string>("buy");

  return (
    <Card className="w-full max-w-sm h-full">
      <CardBody className="p-4 rounded-lg w-full h-full">
        <Tabs
          fullWidth
          aria-label="Trading Tabs"
          selectedKey={selected}
          size="md"
          onSelectionChange={(key) => setSelected(key as string)}
        >
          <Tab key="buy" title="Buy">
            <BuyAndSellComponent side="buy" />
          </Tab>
          <Tab key="sell" title="Sell">
            <BuyAndSellComponent side="sell" />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}

function BuyAndSellComponent({ side }: { side: "buy" | "sell" }) {
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [price, setPrice] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [leverage, setLeverage] = useState<number>(1);

  const handlePercentageClick = (percentage: number) => {
    setAmount(((1000 * percentage) / 100).toFixed(2));
  };

  const total = orderType === "market" ? "Market Price" : (Number(price) * Number(amount) * leverage).toFixed(2);

  return (
    <div className="p-4 space-y-4 flex flex-col justify-between items-stretch h-full">
      <div className="space-y-4">
        <Select label="Order Type" value={orderType} onChange={(value) => setOrderType(value as unknown as "market" | "limit")}>
          <SelectItem key="market" value="market">Market</SelectItem>
          <SelectItem key="limit" value="limit">Limit</SelectItem>
        </Select>
        {orderType === "limit" && (
          <Input
            label="Price"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        )}
        <Input
          label="Amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex space-x-2">
          {[25, 50, 75, 100].map((percent) => (
            <Button key={percent} size="sm" onPress={() => handlePercentageClick(percent)}>
              {percent}%
            </Button>
          ))}
        </div>
        <Select
          label="Leverage"
          selectedKeys={String(leverage)}
          onSelectionChange={(value) => setLeverage(Number(value))}
        >
          {[1, 2, 5, 10, 20].map((lev) => (
            <SelectItem key={String(lev)} value={String(lev)}>
              {lev}x
            </SelectItem>
          ))}
        </Select>
        <div className="text-sm text-gray-500">Total: {total}</div>
      </div>
      <Button color={side === "buy" ? "success" : "danger"} fullWidth>
        {side === "buy" ? "Buy" : "Sell"}
      </Button>
    </div>
  );
}