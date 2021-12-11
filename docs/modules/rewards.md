[marinade-web](../README.md) / [Exports](../modules.md) / rewards

# Module: rewards

## Type aliases

### Reward

Ƭ **Reward**: [`RewardConfig`](rewards.md#rewardconfig) & { `apy`: `number`  }

#### Defined in

[rewards.ts:12](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/rewards.ts#L12)

___

### RewardConfig

Ƭ **RewardConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `aprDescription` | `string` | Apr description e.g. 'Emission' , 'Double Dip' |
| `apy?` | `number` | calculated when mapped |
| `dailyRate` | `number` | Daily reward rate |

#### Defined in

[rewards.ts:3](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/rewards.ts#L3)

___

### Rewards

Ƭ **Rewards**: { [key in CoinSymbols]: Reward }

keyed on the applicable reward Token coin symbol

#### Defined in

[rewards.ts:18](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/rewards.ts#L18)

___

### RewardsConfig

Ƭ **RewardsConfig**: { [key in CoinSymbols]: RewardConfig }

keyed on the applicable reward Token coin symbol

#### Defined in

[rewards.ts:23](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/rewards.ts#L23)
