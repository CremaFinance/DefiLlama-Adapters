[marinade-web](../README.md) / [Exports](../modules.md) / pool

# Module: pool

## Interfaces

- [Pool](../interfaces/pool.Pool.md)
- [PoolConfig](../interfaces/pool.PoolConfig.md)

## Type aliases

### Action

Ƭ **Action**: `Object`

Text and link for the 'Actions' available on a pool row in the UI

#### Type declaration

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `url` | `string` |

#### Defined in

[pool.ts:10](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L10)

___

### FetchPools

Ƭ **FetchPools**: (`prices`: [`Prices`](coinSymbols.md#prices)) => `Promise`<`Record`<`string`, [`Pool`](../interfaces/pool.Pool.md)\>\>

#### Type declaration

▸ (`prices`): `Promise`<`Record`<`string`, [`Pool`](../interfaces/pool.Pool.md)\>\>

An async function that is reponsible for fetching the providers pools, mapping the values to a Pool type and returning them
check the existing integrations for examples
some utilites that may be helpful:
- src/utils/update-pool-rewards.ts
- src/utils/update-pool.ts

##### Parameters

| Name | Type |
| :------ | :------ |
| `prices` | [`Prices`](coinSymbols.md#prices) |

##### Returns

`Promise`<`Record`<`string`, [`Pool`](../interfaces/pool.Pool.md)\>\>

#### Defined in

[pool.ts:53](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L53)
