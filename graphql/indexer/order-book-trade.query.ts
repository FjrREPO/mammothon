import { gql } from "graphql-request"

export const queryOrderBookTradeId = (id: string) => {
  return gql`{
    orderBookTrades(
      id: "${id}"
    ) {
      amount
      blockTimestamp
      id
      poolId
      price
      tokenIn
      tokenOut
      transactionHash
    }
  }`
}

export const queryOrderBookTradesList = () => {
  return gql`{
    orderBookTradess {
      items {
        amount
        blockTimestamp
        id
        poolId
        price
        tokenIn
        tokenOut
        transactionHash
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }`
}

export const queryOrderBookTradesId = (id: string) => {
  return gql`{
    orderBookTradess(
      where: {id: "${id}"}
    ) {
      items {
        amount
        blockTimestamp
        id
        poolId
        price
        tokenIn
        tokenOut
        transactionHash
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }`
}