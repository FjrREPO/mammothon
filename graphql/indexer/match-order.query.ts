import { gql } from "graphql-request"

export const queryMatchOrder = () => {
    return gql`
      query GetMatchOrders {
        matchOrderEvents {
          items {
            id
            is_buy
            is_market
            order_index
            tick
            timestamp
            user
            volume
          }
        }
      }
    `
}