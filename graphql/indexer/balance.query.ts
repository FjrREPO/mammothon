import { gql } from "graphql-request";

export const queryBalanceUser = (address: string) => {
  return gql`{
    balances(
      orderBy: blockTimestamp
      orderDirection: desc
      where: {user: "${address}"}
    ) {
      amount
      currency
      lockedAmount
      user
    }
  }`
}

export const queryBalancesList = () => {
  return gql`{
      balancess(
        orderBy: blockTimestamp
        orderDirection: desc
      ) {
      items {
        amount
        user
        currency
        lockedAmount
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

export const queryBalancesUser = (address: string) => {
  return gql`{
      balancess(
        orderBy: blockTimestamp
        orderDirection: desc
        where: {user: "${address}"}
      ) {
      items {
        amount
        user
        currency
        lockedAmount
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
