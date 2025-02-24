import { gql } from "graphql-request"

export const queryDailyBucketId = (id: string) => {
  return gql`{
    dailyBuckets(
      orderBy: blockTimestamp
      orderDirection: desc
      id: "${id}"
    ) {
      average
      close
      count
      high
      id
      low
      open
      poolId
      timestamp
    }
  }`
}

export const queryDailyBucketsList = () => {
  return gql`{
    dailyBucketss(
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      items {
        average
        close
        count
        high
        id
        low
        open
        poolId
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

export const queryDailyBucketsId = (id: string) => {
  return gql`{
    dailyBucketss(
      orderBy: blockTimestamp
      orderDirection: desc
      where: {id: "${id}"}
    ) {
      items {
        average
        close
        count
        high
        id
        low
        open
        poolId
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