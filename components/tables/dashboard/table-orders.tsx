import { OrdersResponse } from "@/types/query/graphql/order.types";
import { Column, TableCustom } from "./table-custom";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { formatTimestamp } from "@/lib/helper";
import React from "react";
import { tokensData } from "@/data/tokensData";
import { normalize } from "@/lib/bignumber";
import { DECIMALS_TOKEN } from "@/lib/constants";

interface TableOrdersProps {
  datas: OrdersResponse[];
  isLoading: boolean;
}

export default function TableOrders({ datas, isLoading }: TableOrdersProps) {
  const columns: Column[] = [
    { name: "Id", uid: "id", sortable: true },
    { name: "Order Id", uid: "orderId", sortable: true },
    { name: "Time", uid: "timestamp", sortable: true },
    { name: "Expiry", uid: "expiry", sortable: true },
    { name: "Token", uid: "token", sortable: true, sortingKey: "pool.coin" },
    { name: "Quantity", uid: "quantity", sortable: true },
    { name: "Status", uid: "status", sortable: true }
  ];

  const renderCell = React.useCallback((item: OrdersResponse, columnKey: string) => {
    const cellValue = item[columnKey as keyof OrdersResponse];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col cursor-pointer">
            <p className="text-bold text-sm capitalize max-w-12 truncate">{item.id}</p>
          </div>
        );
      case "orderId":
        return (
          <div className="flex flex-col cursor-pointer">
            <p className="text-bold text-sm capitalize">{item.orderId}</p>
          </div>
        );
      case "timestamp":
        return (
          <div className="flex flex-row gap-2 items-center">
            <p className="text-bold text-sm capitalize">{formatTimestamp(Number(item.timestamp))}</p>
          </div>
        );
      case "expiry":
        return (
          <div className="flex flex-row gap-2 items-center">
            <p className="text-bold text-sm capitalize">{formatTimestamp(Number(item.expiry))}</p>
          </div>
        );
      case "token":
        {
          const tokenSymbol = item.pool?.coin?.split("/")[0];
          const findToken = !isLoading && tokenSymbol
            ? tokensData?.find((token) => token.symbol.toLowerCase() === tokenSymbol.toLowerCase())
            : null;

          return (
            <div className="flex flex-row gap-2 items-center">
              {findToken?.logo ? (
                <Image
                  src={findToken.logo}
                  alt={tokenSymbol || "Token"}
                  className="min-w-6 min-h-6 w-6 h-6 rounded-full"
                />
              ) : (
                <div className="min-w-6 min-h-6 w-6 h-6 rounded-full bg-gray-300" />
              )}
              <p className="text-bold text-tiny capitalize text-default-500">
                {item.pool?.coin || "Unknown"}
              </p>
            </div>
          );
        };
      case "quantity":
        return (
          <div className="flex flex-row gap-2 items-center">
            <p className="text-bold text-sm capitalize">{normalize(item.quantity, DECIMALS_TOKEN)}</p>
          </div>
        );
      case "status":
        return (
          <div className="flex flex-row items-center gap-2">
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={"success"}
              size="sm"
              variant="dot"
            >
              {cellValue as string}
            </Chip>
          </div>
        );
      default:
        return cellValue as string;
    }
  }, [isLoading]);

  return (
    <TableCustom
      <OrdersResponse>
      className="cursor-pointer py-2"
      isLoading={isLoading}
      data={datas}
      columns={columns}
      renderCell={renderCell}
      searchKey="pool"
      enableSelection={false}
      enableColumnSelection={true}
      rowsPerPageOptions={[5, 10, 20]}
      initialRowsPerPage={5}
      searchPlaceholder="Search by token..."
    />
  );
}