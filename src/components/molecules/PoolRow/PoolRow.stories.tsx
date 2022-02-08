import type { ComponentStory, ComponentMeta } from "@storybook/react";

import PoolRow from "./index";

export default {
  title: "Atoms/PoolRow",
  component: PoolRow,
} as ComponentMeta<typeof PoolRow>;

const Template: ComponentStory<typeof PoolRow> = (args) => (
  <PoolRow {...args} />
);

export const Liqiudity = Template.bind({});
Liqiudity.args = {
  pool: {
    chainId: 101,
    address: "9EQMEzJdE2LDAY1hw1RytpufdwAXzatYfQ3M2UuT9b88",
    symbol: "mSOL/SOL",
    name: "Orca Aquafarm Token (mSOL/SOL)",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3RTGL7gPF4V1ns1AeGFApT7cBEGVDfmJ77DqQi9AC6uG/logo.svg",
    tags: ["lp-token"],
    extensions: {},
    provider: "Orca",
    marketType: "LiquidityPool",
    providerId: "mSOL/SOL[stable][aquafarm]",
    tokenA: "msol",
    tokenB: "sol",
    rewards: {
      orca: {
        aprDescription: "Emission",
        dailyRate: 400.6849315068493,
        apy: 3.2887873290521905,
      },
      mnde: {
        aprDescription: "Double Dip",
        dailyRate: 6144,
        apy: 2.876070143892445,
      },
    },
    actions: [
      {
        text: "Add Liquidity",
        url: "https://www.orca.so/pools",
        isExternal: true,
      },
      { text: "Swap", url: "https://www.orca.so/pools", isExternal: true },
    ],
    liq: 58699447.755302526,
    totalLockedValue: 58699447.755302526,
    tradingApy: 4.392165577528486,
    apy: 10.557023050473122,
  },
};

export const Lending = Template.bind({});
Lending.args = {
  pool: {
    chainId: 101,
    address: "GoNeG1rhoZMuLqy6aUNfzyHjkCe9dwFuWTFwENPfU3q8",
    symbol: "mSOL",
    name: "Port mSol",
    decimals: 6,
    logoURI:
      "https://marinade.finance/static/eac2cd9ccef341c9bc12484fc94682f6/08f35/port.avif",
    extensions: {},
    provider: "Port",
    marketType: "Lending",
    providerId: "GoNeG1rhoZMuLqy6aUNfzyHjkCe9dwFuWTFwENPfU3q8",
    tokenA: "msol",
    rewards: {
      mnde: {
        aprDescription: "Emission",
        dailyRate: 13736,
        apy: 4.7427090601561765,
      },
      port: {
        aprDescription: "Double Dip",
        dailyRate: 1000,
        apy: 1.7566108379510674,
      },
    },
    actions: [
      {
        text: "Supply",
        url: "https://mainnet.port.finance/#/supply",
        isExternal: true,
      },
      {
        text: "Borrow",
        url: "https://mainnet.port.finance/#/borrow",
        isExternal: true,
      },
    ],
    liq: 79582225.60157867,
    totalLockedValue: 79582225.60157867,
    tradingApy: 0.03,
    apy: 6.529319898107245,
  },
};
