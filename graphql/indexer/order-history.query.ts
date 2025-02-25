import { gql } from "graphql-request"

export const queryOrderHistoryId = (id: string) => {
  return gql`{
    orderHistory(
      orderBy: blockTimestamp
      orderDirection: desc
      where: {id: "${id}"}
    ) {
      filled
      id
      order {
        expiry
        filled
        id
        orderId
        poolId
        price
        quantity
        side
        status
        timestamp
        type
        user {
          amount
          currency
          lockedAmount
          user
        }
      }
      orderId
      pool {
        baseCurrency
        coin
        id
        lotSize
        maxOrderAmount
        orderBook
        quoteCurrency
        timestamp
      }
      poolId
      status
      timestamp
    }
  }`
}

export const queryOrderHistorysList = () => {
  return gql`{
    orderHistorys(
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      items {
        filled
        id
        order {
          expiry
          filled
          id
          orderId
          poolId
          price
          quantity
          side
          status
          timestamp
          type
          user {
            amount
            currency
            lockedAmount
            user
          }
        }
        orderId
        pool {
          baseCurrency
          coin
          id
          lotSize
          maxOrderAmount
          orderBook
          quoteCurrency
          timestamp
        }
        poolId
        status
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

export const queryOrderHistorysId = (id: string) => {
  return gql`{
    orderHistorys(
      orderBy: blockTimestamp
      orderDirection: desc
      where: {id: "${id}"}
    ) {
      items {
        filled
        id
        order {
          expiry
          filled
          id
          orderId
          poolId
          price
          quantity
          side
          status
          timestamp
          type
          user {
            amount
            currency
            lockedAmount
            user
          }
        }
        orderId
        pool {
          baseCurrency
          coin
          id
          lotSize
          maxOrderAmount
          orderBook
          quoteCurrency
          timestamp
        }
        poolId
        status
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

export const queryOrderHistorysUser = (address: string) => {
  return gql`{
    orderHistorys(
      orderBy: blockTimestamp
      orderDirection: desc
      where: {order: {user: "${address}"}}
    ) {
      items {
        filled
        id
        order {
          expiry
          filled
          id
          orderId
          poolId
          price
          quantity
          side
          status
          timestamp
          type
          user {
            amount
            currency
            lockedAmount
            user
          }
        }
        orderId
        pool {
          baseCurrency
          coin
          id
          lotSize
          maxOrderAmount
          orderBook
          quoteCurrency
          timestamp
        }
        poolId
        status
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