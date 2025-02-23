import { VaultResponse } from "@/data/dataVaults";
import { Column, TableCustom } from "../table-custom";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import React from "react";

interface TableVaultProps {
  datas: VaultResponse[];
}

export default function TableVaults({ datas }: TableVaultProps) {
  const columns: Column[] = [
    { name: "Name", uid: "name", sortable: true },
    { name: "Token", uid: "token", sortable: true, sortingKey: "token.symbol" },
    { name: "Status", uid: "status", sortable: true }
  ];

  const renderCell = React.useCallback((item: VaultResponse, columnKey: string) => {
    const cellValue = item[columnKey as keyof VaultResponse];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col cursor-pointer py-5">
            <p className="text-bold text-lg capitalize">{cellValue as string}</p>
          </div>
        );
      case "token":
        return (
          <div className="flex flex-row gap-2 items-center">
            <Image src={"/coin-usdc.png"} alt={item.token.symbol} className="w-6 h-6" />
            <p className="text-bold text-tiny capitalize text-default-500">{item.token.symbol}</p>
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
              <p>active</p>
            </Chip>
          </div>
        );
      default:
        return cellValue as string;
    }
  }, []);

  return (
    <TableCustom
      <VaultResponse>
      className="cursor-pointer py-2"
      data={datas}
      columns={columns}
      renderCell={renderCell}
      searchKey="name"
      enableSelection={false}
      enableColumnSelection={true}
      rowsPerPageOptions={[5, 10, 20]}
      initialRowsPerPage={5}
    />
  );
}