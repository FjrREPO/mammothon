import { gql } from "graphql-request"

export const queryOrderId = (id: string) => {
  return gql`{
    orders(
      orderBy: blockTimestamp
      orderDirection: desc
      id: "${id}"
    ) {
      expiry
      filled
      id
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
      orderHistory {
        items {
          filled
          id
          orderId
          poolId
          status
          timestamp
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
          }
        }
        totalCount
      }
    }
  }`
}

export const queryOrdersList = () => {
  return gql`{
    orderss(
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      items {
        expiry
        filled
        id
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
        orderHistory {
          items {
            filled
            id
            orderId
            poolId
            status
            timestamp
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
            }
          }
          totalCount
        }
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

export const queryOrdersUser = (address: string) => {
  return gql`{
    orderss(
      orderBy: blockTimestamp
      orderDirection: desc
      where: {user: "${address}"}
    ) {
      items {
        expiry
        filled
        id
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
        orderHistory {
          items {
            filled
            id
            orderId
            poolId
            status
            timestamp
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
            }
          }
          totalCount
        }
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

export const queryOrdersId = (id: string) => {
  return gql`{
    orderss(
      orderBy: blockTimestamp
      orderDirection: desc
      where: {id: "${id}"}
    ) {
      items {
        expiry
        filled
        id
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
        orderHistory {
          items {
            filled
            id
            orderId
            poolId
            status
            timestamp
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
            }
          }
          totalCount
        }
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