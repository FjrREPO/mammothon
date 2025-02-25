import { queryMatchOrder } from "@/graphql/indexer/match-order.query";
import { MatchOrder } from "@/types/query/graphql/match-order.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export const useMatchOrderEvents = () => {
    const { data, isLoading, error } = useQuery<MatchOrder>({
        queryKey: ["tickEvents"],
        queryFn: async () => {
            return await request(process.env.NEXT_PUBLIC_API_GRAPHQL_INDEXER_URL || "", queryMatchOrder())
        },
        refetchInterval: 500,
        staleTime: 0,
        refetchOnWindowFocus: true,
    })

    return {
        moData: data,
        moLoading: isLoading,
        moError: error
    }
}