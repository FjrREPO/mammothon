import { gql } from "graphql-request"

export const queryThirtyMinuteBucketId = (id: string) => {
  return gql`{
    thirtyMinuteBuckets(
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

export const queryThirtyMinuteBucketsList = () => {
  return gql`{
    thirtyMinuteBucketss {
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

export const queryThirtyMinuteBucketsId = (id: string) => {
  return gql`{
    thirtyMinuteBucketss(
      orderBy: timestamp
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