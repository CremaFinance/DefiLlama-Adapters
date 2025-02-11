const { getUniTVL } = require('../helper/unknownTokens')

module.exports = {
  misrepresentedTokens: true,
  methodology: "Factory address (0xE1d563BcFD4E2a5A9ce355CC8631421186521aAA) is used to find the LP pairs. TVL is equal to the liquidity on the AMM.",
  hpb: {
    tvl: getUniTVL({
      factory: "0xE1d563BcFD4E2a5A9ce355CC8631421186521aAA",
      chain: "hpb",
      coreAssets: ['0xBE05Ac1FB417c9EA435b37a9Cecd39Bc70359d31',]
    })
  }
}
