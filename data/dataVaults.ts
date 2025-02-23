import { z } from "zod";

export const vaultsSchema = z.object({
    address: z.string().optional(),
    type: z.string().optional(),
    kind: z.string().optional(),
    symbol: z.string().optional(),
    name: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    version: z.string().optional(),
    decimals: z.number().optional(),
    chainID: z.number().optional(),
    token: z.object({
        address: z.string().optional(),
        name: z.string().optional(),
        symbol: z.string().optional(),
        description: z.string().optional(),
        decimals: z.number().optional(),
    }),
    tvl: z.object({
        totalAssets: z.string().optional(),
        tvl: z.number().optional(),
        price: z.number().optional(),
    }),
    apr: z.object({
        type: z.string().optional(),
        netAPR: z.nullable(z.number()),
        fees: z.object({
            performance: z.nullable(z.number()),
            management: z.nullable(z.number()),
        }),
        points: z.object({
            weekAgo: z.nullable(z.number()),
            monthAgo: z.nullable(z.number()),
            inception: z.nullable(z.number()),
        }),
        pricePerShare: z.object({
            today: z.nullable(z.number()),
            weekAgo: z.nullable(z.number()),
            monthAgo: z.nullable(z.number()),
        }),
        extra: z.object({
            stakingRewardsAPR: z.nullable(z.number()),
            gammaRewardAPR: z.nullable(z.number()),
        }),
        forwardAPR: z.object({
            type: z.string().optional(),
            netAPR: z.nullable(z.number()),
            composite: z.object({
                boost: z.nullable(z.number()),
                poolAPY: z.nullable(z.number()),
                boostedAPR: z.nullable(z.number()),
                baseAPR: z.nullable(z.number()),
                cvxAPR: z.nullable(z.number()),
                rewardsAPR: z.nullable(z.number()),
                v3OracleCurrentAPR: z.nullable(z.number()).optional(),
                v3OracleStratRatioAPR: z.nullable(z.number()).optional(),
            }),
        }),
    }),
    strategies: z.array(z.unknown()),
    staking: z.object({
        address: z.string().optional(),
        available: z.boolean().optional(),
        source: z.string().optional(),
        rewards: z.nullable(z.unknown()),
    }),
    migration: z.object({
        available: z.boolean().optional(),
        address: z.string().optional(),
        contract: z.string().optional(),
    }),
    featuringScore: z.number().optional(),
    pricePerShare: z.string().optional(),
    info: z.object({
        sourceURL: z.string().optional(),
        riskLevel: z.number().optional(),
        isRetired: z.boolean().optional(),
        isBoosted: z.boolean().optional(),
        isHighlighted: z.boolean().optional(),
        riskScore: z.array(z.number()),
        riskScoreComment: z.string().optional(),
    }),
});

export const vaultsListSchema = z.array(vaultsSchema);

export type VaultResponse = z.infer<typeof vaultsSchema>;
export type VaultResponseList = z.infer<typeof vaultsListSchema>;

export const dataVaults: VaultResponse[] = [
    {
        "address": "0xa442BEB83baBC33D93c8Bec471070Ce59b88fb7d",
        "type": "Experimental Yearn Vault",
        "kind": "Legacy",
        "symbol": "yvWETH",
        "name": "WETH yVault",
        "category": "Volatile",
        "version": "0.4.2",
        "decimals": 18,
        "chainID": 1,
        "token": {
            "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "name": "Wrapped Ether",
            "symbol": "WETH",
            "description": "",
            "decimals": 18
        },
        "tvl": {
            "totalAssets": "0",
            "tvl": 0,
            "price": 2590.47
        },
        "apr": {
            "type": "",
            "netAPR": null,
            "fees": {
                "performance": null,
                "management": null
            },
            "points": {
                "weekAgo": null,
                "monthAgo": null,
                "inception": null
            },
            "pricePerShare": {
                "today": null,
                "weekAgo": null,
                "monthAgo": null
            },
            "extra": {
                "stakingRewardsAPR": null,
                "gammaRewardAPR": null
            },
            "forwardAPR": {
                "type": "",
                "netAPR": null,
                "composite": {
                    "boost": null,
                    "poolAPY": null,
                    "boostedAPR": null,
                    "baseAPR": null,
                    "cvxAPR": null,
                    "rewardsAPR": null
                }
            }
        },
        "strategies": [],
        "staking": {
            "address": "",
            "available": false,
            "source": "",
            "rewards": null
        },
        "migration": {
            "available": true,
            "address": "0xa258C4606Ca8206D8aA700cE2143D7db854D168c",
            "contract": "0x1824df8D751704FA10FA371d62A37f9B8772ab90"
        },
        "featuringScore": 0,
        "pricePerShare": "1000000000000000000",
        "info": {
            "riskLevel": -1,
            "isRetired": true,
            "isBoosted": false,
            "isHighlighted": false,
            "riskScore": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        }
    },
    {
        "address": "0xC9FB833f11d2d8169953b144Fa5242e8aeC25C01",
        "type": "Yearn Vault",
        "kind": "Multi Strategy",
        "symbol": "yPT-sDAI",
        "name": "yPT-sDAI Yearn Auto-Rolling Pendle PT",
        "category": "Pendle Autorollover",
        "version": "3.0.2",
        "description": "This vault invests into [Pendle PT Markets](https://app.pendle.finance/trade/markets) and automatically rolls them gas-free into the next maturity upon expiry. \u003cbr/\u003e\u003cbr/\u003eRead the [Pendle Docs](https://docs.pendle.finance/) to learn about the associated risks. Withdrawals may result in a loss depending on withdrawal size and current market conditions.",
        "decimals": 18,
        "chainID": 1,
        "token": {
            "address": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            "name": "Dai Stablecoin",
            "symbol": "DAI",
            "description": "",
            "decimals": 18
        },
        "tvl": {
            "totalAssets": "1001000000000000",
            "tvl": 0.001000503504,
            "price": 0.999504
        },
        "apr": {
            "type": "",
            "netAPR": null,
            "fees": {
                "performance": null,
                "management": null
            },
            "points": {
                "weekAgo": null,
                "monthAgo": null,
                "inception": null
            },
            "pricePerShare": {
                "today": null,
                "weekAgo": null,
                "monthAgo": null
            },
            "extra": {
                "stakingRewardsAPR": null,
                "gammaRewardAPR": null
            },
            "forwardAPR": {
                "type": "",
                "netAPR": null,
                "composite": {
                    "boost": null,
                    "poolAPY": null,
                    "boostedAPR": null,
                    "baseAPR": null,
                    "cvxAPR": null,
                    "rewardsAPR": null
                }
            }
        },
        "strategies": [],
        "staking": {
            "address": "",
            "available": false,
            "source": "",
            "rewards": null
        },
        "migration": {
            "available": false,
            "address": "0xC9FB833f11d2d8169953b144Fa5242e8aeC25C01",
            "contract": "0x0000000000000000000000000000000000000000"
        },
        "featuringScore": 0,
        "pricePerShare": "1000000000000000000",
        "info": {
            "riskLevel": 1,
            "isRetired": true,
            "isBoosted": false,
            "isHighlighted": false,
            "riskScore": [
                1,
                1,
                1,
                1,
                1,
                2,
                1,
                1,
                1,
                2,
                2
            ]
        }
    },
    {
        "address": "0x7356f09C294Cb9c6428AC7327B24B0f29419C181",
        "type": "Experimental Yearn Vault",
        "kind": "Legacy",
        "symbol": "yvSNX",
        "name": "SNX yVault",
        "category": "Volatile",
        "version": "0.3.1",
        "decimals": 18,
        "chainID": 1,
        "token": {
            "address": "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
            "name": "Synthetix Network Token",
            "symbol": "SNX",
            "description": "Synthetix is a decentralized finance (DeFi) protocol that provides on-chain exposure to a wide variety of crypto and non-crypto assets. The protocol is based on the Ethereum (ETH) blockchain and offers users access to highly liquid synthetic assets (synths). Synths track and provide returns on the underlying asset without requiring one to directly hold the asset. SNX tokens are used for protocol governance and can also be used as collateral to mint synths.",
            "decimals": 18
        },
        "tvl": {
            "totalAssets": "351447095030585226",
            "tvl": 0.3382492022709017,
            "price": 0.962447
        },
        "apr": {
            "type": "",
            "netAPR": null,
            "fees": {
                "performance": null,
                "management": null
            },
            "points": {
                "weekAgo": null,
                "monthAgo": null,
                "inception": null
            },
            "pricePerShare": {
                "today": null,
                "weekAgo": null,
                "monthAgo": null
            },
            "extra": {
                "stakingRewardsAPR": null,
                "gammaRewardAPR": null
            },
            "forwardAPR": {
                "type": "",
                "netAPR": null,
                "composite": {
                    "boost": null,
                    "poolAPY": null,
                    "boostedAPR": null,
                    "baseAPR": null,
                    "cvxAPR": null,
                    "rewardsAPR": null
                }
            }
        },
        "strategies": [],
        "staking": {
            "address": "",
            "available": false,
            "source": "",
            "rewards": null
        },
        "migration": {
            "available": true,
            "address": "0xF29AE508698bDeF169B89834F76704C3B205aedf",
            "contract": "0x1824df8D751704FA10FA371d62A37f9B8772ab90"
        },
        "featuringScore": 0,
        "pricePerShare": "1001505341596413811",
        "info": {
            "riskLevel": -1,
            "isRetired": true,
            "isBoosted": false,
            "isHighlighted": false,
            "riskScore": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        }
    },
    {
        "address": "0x5b2384D566D2E4a0b29B8eccB642C63199cd393c",
        "type": "Automated Yearn Vault",
        "kind": "Legacy",
        "symbol": "yvCurve-sUSD-f",
        "name": "Curve sUSD Factory yVault",
        "category": "Stablecoin",
        "version": "0.4.5",
        "decimals": 18,
        "chainID": 1,
        "token": {
            "address": "0xC25a3A3b969415c80451098fa907EC722572917F",
            "name": "Curve sUSD Pool",
            "symbol": "crvSUSD",
            "description": "This token represents a Curve liquidity pool. Holders earn fees from users trading in the pool, and can also deposit the LP to Curve's gauges to earn CRV emissions. This pool contains DAI, USDC, USDT, and synthetic USD (sUSD) minted on the Synthetix platform.",
            "decimals": 18
        },
        "tvl": {
            "totalAssets": "40605790454785558007478",
            "tvl": 43418.58541294868,
            "price": 1.06927078445364
        },
        "apr": {
            "type": "v2:averaged",
            "netAPR": 0,
            "fees": {
                "performance": 0.1,
                "management": 0
            },
            "points": {
                "weekAgo": 0,
                "monthAgo": 0,
                "inception": 0.05997461639783341
            },
            "pricePerShare": {
                "today": 1.0599746163978334,
                "weekAgo": 1.0599746163978334,
                "monthAgo": 1.0599746163978334
            },
            "extra": {
                "stakingRewardsAPR": null,
                "gammaRewardAPR": null
            },
            "forwardAPR": {
                "type": "crv",
                "netAPR": 0.0027465307886247446,
                "composite": {
                    "boost": 2.5,
                    "poolAPY": 0.0029,
                    "boostedAPR": 0.0001517008762497163,
                    "baseAPR": 0.000060680350499886515,
                    "cvxAPR": 0,
                    "rewardsAPR": 0
                }
            }
        },
        "strategies": [
            {
                "address": "0x7C5473fb357d9511d4B580b85191681773a4Eb3d",
                "name": "StrategyCurveBoostedFactory-crvPlain3andSUSD",
                "details": {
                    "totalDebt": "40605790454785558007478",
                    "totalLoss": "0",
                    "totalGain": "0",
                    "performanceFee": 0,
                    "lastReport": 1737445727,
                    "debtRatio": 10000
                }
            }
        ],
        "staking": {
            "address": "",
            "available": false,
            "source": "",
            "rewards": null
        },
        "migration": {
            "available": false,
            "address": "0x5b2384D566D2E4a0b29B8eccB642C63199cd393c",
            "contract": "0x0000000000000000000000000000000000000000"
        },
        "featuringScore": 0,
        "pricePerShare": "1059974616397833521",
        "info": {
            "sourceURL": "https://curve.fi/#/ethereum/pools/susd/deposit",
            "riskLevel": 0,
            "isRetired": false,
            "isBoosted": false,
            "isHighlighted": false,
            "riskScore": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        }
    },
    {
        "address": "0xB98Df7163E61bf053564bde010985f67279BBCEC",
        "type": "Experimental Yearn Vault",
        "kind": "Legacy",
        "symbol": "yvDAI",
        "name": "DAI yVault",
        "category": "Stablecoin",
        "version": "0.3.0",
        "decimals": 18,
        "chainID": 1,
        "token": {
            "address": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            "name": "Dai Stablecoin",
            "symbol": "DAI",
            "description": "",
            "decimals": 18
        },
        "tvl": {
            "totalAssets": "5161550505925987260",
            "tvl": 5.158990376875048,
            "price": 0.999504
        },
        "apr": {
            "type": "",
            "netAPR": null,
            "fees": {
                "performance": null,
                "management": null
            },
            "points": {
                "weekAgo": null,
                "monthAgo": null,
                "inception": null
            },
            "pricePerShare": {
                "today": null,
                "weekAgo": null,
                "monthAgo": null
            },
            "extra": {
                "stakingRewardsAPR": null,
                "gammaRewardAPR": null
            },
            "forwardAPR": {
                "type": "",
                "netAPR": null,
                "composite": {
                    "boost": null,
                    "poolAPY": null,
                    "boostedAPR": null,
                    "baseAPR": null,
                    "cvxAPR": null,
                    "rewardsAPR": null
                }
            }
        },
        "strategies": [],
        "staking": {
            "address": "",
            "available": false,
            "source": "",
            "rewards": null
        },
        "migration": {
            "available": true,
            "address": "0xdA816459F1AB5631232FE5e97a05BBBb94970c95",
            "contract": "0x1824df8D751704FA10FA371d62A37f9B8772ab90"
        },
        "featuringScore": 0,
        "pricePerShare": "1000898159130851173",
        "info": {
            "riskLevel": -1,
            "isRetired": true,
            "isBoosted": false,
            "isHighlighted": false,
            "riskScore": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        }
    },
    {
        "address": "0x1133b2E2F51becCF25b2f8d0cA48c1d93DD5ab12",
        "type": "Experimental Yearn Vault",
        "kind": "Legacy",
        "symbol": "yvOCEAN",
        "name": "OCEAN yVault",
        "category": "Volatile",
        "version": "0.3.2",
        "decimals": 18,
        "chainID": 1,
        "token": {
            "address": "0x967da4048cD07aB37855c090aAF366e4ce1b9F48",
            "name": "Ocean Token",
            "symbol": "OCEAN",
            "description": "",
            "decimals": 18
        },
        "tvl": {
            "totalAssets": "25727813891917962826",
            "tvl": 8.648533278837682,
            "price": 0.336155
        },
        "apr": {
            "type": "",
            "netAPR": null,
            "fees": {
                "performance": null,
                "management": null
            },
            "points": {
                "weekAgo": null,
                "monthAgo": null,
                "inception": null
            },
            "pricePerShare": {
                "today": null,
                "weekAgo": null,
                "monthAgo": null
            },
            "extra": {
                "stakingRewardsAPR": null,
                "gammaRewardAPR": null
            },
            "forwardAPR": {
                "type": "",
                "netAPR": null,
                "composite": {
                    "boost": null,
                    "poolAPY": null,
                    "boostedAPR": null,
                    "baseAPR": null,
                    "cvxAPR": null,
                    "rewardsAPR": null
                }
            }
        },
        "strategies": [],
        "staking": {
            "address": "",
            "available": false,
            "source": "",
            "rewards": null
        },
        "migration": {
            "available": false,
            "address": "0x0000000000000000000000000000000000000000",
            "contract": "0x1133b2E2F51becCF25b2f8d0cA48c1d93DD5ab12"
        },
        "featuringScore": 0,
        "pricePerShare": "1086293291929898982",
        "info": {
            "riskLevel": -1,
            "isRetired": true,
            "isBoosted": false,
            "isHighlighted": false,
            "riskScore": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        }
    }
]