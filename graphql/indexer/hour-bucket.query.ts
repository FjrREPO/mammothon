import { gql } from "graphql-request"

export const queryHourBucketId = (id: string) => {
  return gql`{
    hourBuckets(
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

export const queryHourBucketsList = () => {
  return gql`{
    hourBucketss(
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

export const queryHourBucketsId = (id: string) => {
  return gql`{
    hourBucketss(
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