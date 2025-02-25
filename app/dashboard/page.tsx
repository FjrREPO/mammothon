"use client";

import { subtitle } from "@/components/primitives";
import TableOrders from "@/components/tables/dashboard/table-orders";
import { useOrdersList } from "@/hooks/query/graphql/order/useOrdersList";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Page() {
  const { oData } = useOrdersList();

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
            Dashboard
          </motion.span>
          <motion.span
            className={cn(subtitle(), "text-start")}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Manage your token here.
          </motion.span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full"
        >
          <TableOrders datas={oData?.orderss.items ?? []} />
        </motion.div>
      </div>
    </div>
  );
}
