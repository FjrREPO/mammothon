import { OrdersResponse } from "@/types/query/graphql/order.types";
import { Column, TableCustom } from "../table-custom";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import React from "react";
import { formatTimestamp } from "@/lib/helper";
import { useTokenMetadata } from "@/hooks/query/api/useTokenMetadata";
import SkeletonWrapper from "@/components/loader/skeleton-wrapper";

interface TableOrdersProps {
  datas: OrdersResponse[];
}

export default function TableOrders({ datas }: TableOrdersProps) {
  const {
    tmData,
    tmLoading
  } = useTokenMetadata();

  const columns: Column[] = [
    { name: "Id", uid: "id", sortable: true },
    { name: "Order Id", uid: "orderId", sortable: true },
    { name: "Time", uid: "timestamp", sortable: true },
    { name: "Expiry", uid: "expiry", sortable: true },
    { name: "Token", uid: "token", sortable: true, sortingKey: "pool.coin" },
    { name: "Status", uid: "status", sortable: true }
  ];

  const renderCell = React.useCallback((item: OrdersResponse, columnKey: string) => {
    const cellValue = item[columnKey as keyof OrdersResponse];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col cursor-pointer py-5">
            <p className="text-bold text-sm capitalize max-w-12 truncate">{item.id}</p>
          </div>
        );
      case "orderId":
        return (
          <div className="flex flex-col cursor-pointer py-5">
            <p className="text-bold text-sm capitalize">{item.orderId}</p>
          </div>
        );
      case "timestamp":
        return (
          <div className="flex flex-row gap-2 items-center py-5">
            <p className="text-bold text-sm capitalize">{formatTimestamp(Number(item.timestamp))}</p>
          </div>
        );
      case "expiry":
        return (
          <div className="flex flex-row gap-2 items-center py-5">
            <p className="text-bold text-sm capitalize">{formatTimestamp(Number(item.expiry))}</p>
          </div>
        );
      case "token":
        {
          // item.pool?.coin like this PEPE/USDC, i want to get the PEPE token and remove the /USDC
          const tokenSymbol = item.pool?.coin?.split("/")[0];
          const findToken = tmData?.find((token) => token.symbol.toLowerCase() === tokenSymbol?.toLowerCase());

          return (
            <SkeletonWrapper isLoading={tmLoading}>
              <div className="flex flex-row gap-2 items-center py-5">
                <Image src={findToken?.logo} alt={item.pool?.coin} className="min-w-6 min-h-6 w-6 h-6" />
                <p className="text-bold text-tiny capitalize text-default-500">{item.pool?.coin}</p>
              </div>
            </SkeletonWrapper>
          )
        };
      case "status":
        return (
          <div className="flex flex-row items-center gap-2 py-5">
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
  }, [tmData, tmLoading]);

  return (
    <TableCustom
      <OrdersResponse>
      className="cursor-pointer py-2"
      data={datas}
      columns={columns}
      renderCell={renderCell}
      searchKey="pool"
      enableSelection={false}
      enableColumnSelection={true}
      rowsPerPageOptions={[5, 10, 20]}
      initialRowsPerPage={5}
    />
  );
}