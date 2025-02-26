import { gql } from "graphql-request"

export const queryPoolId = (id: string) => {
  return gql`{
    pools(
      id: "${id}"
    ) {
      baseCurrency
      coin
      id
      lotSize
      maxOrderAmount
      orderBook
      quoteCurrency
      timestamp
    }
  }`
}

export const queryPoolsList = () => {
  return gql`{
    poolss {
      items {
        baseCurrency
        coin
        id
        lotSize
        maxOrderAmount
        orderBook
        quoteCurrency
        timestamp
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

export const queryPoolsId = (id: string) => {
  return gql`{
    poolss(
      where: {id: "${id}"}
    ) {
      items {
        baseCurrency
        coin
        id
        lotSize
        maxOrderAmount
        orderBook
        quoteCurrency
        timestamp
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