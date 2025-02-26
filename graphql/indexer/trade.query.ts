import { gql } from "graphql-request"

export const queryTradeId = (id: string) => {
  return gql`{
    trades(
      id: "${id}"
    ) {
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
        orderHistory {
          items {
            filled
            id
            orderId
            poolId
            status
            timestamp
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
                user
                lockedAmount
                currency
                amount
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
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
        user {
          amount
          currency
          lockedAmount
          user
        }
      }
    }
  }`
}

export const queryTradesList = () => {
  return gql`{
    tradess {
      items {
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
          orderHistory {
            items {
              filled
              id
              orderId
              poolId
              status
              timestamp
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
                  user
                  lockedAmount
                  currency
                  amount
                }
              }
            }
            totalCount
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
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
          user {
            amount
            currency
            lockedAmount
            user
          }
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

export const queryTradesId = (id: string) => {
  return gql`{
    tradess(
      where: {id: "${id}"}
    ) {
      items {
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
          orderHistory {
            items {
              filled
              id
              orderId
              poolId
              status
              timestamp
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
                  user
                  lockedAmount
                  currency
                  amount
                }
              }
            }
            totalCount
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
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
          user {
            amount
            currency
            lockedAmount
            user
          }
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