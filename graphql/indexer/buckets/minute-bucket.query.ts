import { gql } from "graphql-request"

export const queryMinuteBucketId = (id: string) => {
  return gql`{
    minuteBuckets(
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

export const queryMinuteBucketsList = () => {
  return gql`{
    minuteBucketss {
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

export const queryMinuteBucketsId = (id: string) => {
  return gql`{
    minuteBucketss(
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