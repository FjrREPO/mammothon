import { z } from "zod";

export const coinMarketCapSchema = z.object({
  id: z.number(),
  name: z.string(),
  symbol: z.string(),
  category: z.string(),
  description: z.string(),
  slug: z.string(),
  logo: z.string().url(),
  subreddit: z.string(),
  notice: z.string(),
  tags: z.array(z.string()),
  "tag-names": z.array(z.string()),
  "tag-groups": z.array(z.string()),
  urls: z.object({
    website: z.array(z.string().url()),
    twitter: z.array(z.string().url()),
    message_board: z.array(z.string()),
    chat: z.array(z.string()),
    facebook: z.array(z.string()),
    explorer: z.array(z.string().url()),
    reddit: z.array(z.string()),
    technical_doc: z.array(z.string()),
    source_code: z.array(z.string()),
    announcement: z.array(z.string()),
  }),
  platform: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    symbol: z.string(),
    token_address: z.string(),
  }),
  date_added: z.string().datetime(),
  twitter_username: z.string(),
  is_hidden: z.number(),
  date_launched: z.nullable(z.string()),
  contract_address: z.array(
    z.object({
      contract_address: z.string(),
      platform: z.object({
        name: z.string(),
        coin: z.object({
          id: z.string(),
          name: z.string(),
          symbol: z.string(),
          slug: z.string(),
        }),
      }),
    })
  ),
  self_reported_circulating_supply: z.nullable(z.number()),
  self_reported_tags: z.nullable(z.array(z.string())),
  self_reported_market_cap: z.nullable(z.number()),
  infinite_supply: z.boolean(),
});

export type CoinMarketCapResponse = z.infer<typeof coinMarketCapSchema>;