import { gql } from "graphql-request";

export const queryBalanceUser = (address: string) => {
  return gql`{
    balances(
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
      balancess {
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
