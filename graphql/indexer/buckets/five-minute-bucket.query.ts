import { gql } from "graphql-request"

export const queryFiveMinuteBucketId = (id: string) => {
  return gql`{
    fiveMinuteBuckets(
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

export const queryFiveMinuteBucketsList = () => {
  return gql`{
    fiveMinuteBucketss {
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

export const queryFiveMinuteBucketsId = (id: string) => {
  return gql`{
    fiveMinuteBucketss(
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