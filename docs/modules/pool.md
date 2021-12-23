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

[pool.ts:10](https://github.com/marinade-finance/marinade-web/blob/c14991b/src/services/domain/pool.ts#L10)

___

### FetchPools

Ƭ **FetchPools**: (`prices`: [`Prices`](coinSymbols.md#prices), `options?`: `Record`<`string`, `unknown`\>) => `Promise`<`Record`<`string`, [`Pool`](../interfaces/pool.Pool.md)\>\>

#### Type declaration

▸ (`prices`, `options?`): `Promise`<`Record`<`string`, [`Pool`](../interfaces/pool.Pool.md)\>\>

An async function that is reponsible for fetching the providers pools, mapping the values to a Pool type and returning them.
Check the existing integrations for examples, but feel free to use own implementation, as long as the returned map is Record<string, Pool> (with string being the unique pool token address)
some utilites that may be helpful:
- src/utils/update-pool-rewards.ts
- src/utils/update-pool.ts

##### Parameters

| Name | Type |
| :------ | :------ |
| `prices` | [`Prices`](coinSymbols.md#prices) |
| `options?` | `Record`<`string`, `unknown`\> |

##### Returns

`Promise`<`Record`<`string`, [`Pool`](../interfaces/pool.Pool.md)\>\>

#### Defined in

[pool.ts:57](https://github.com/marinade-finance/marinade-web/blob/c14991b/src/services/domain/pool.ts#L57)

___

### PoolAddress

Ƭ **PoolAddress**: `string`

#### Defined in

[pool.ts:13](https://github.com/marinade-finance/marinade-web/blob/c14991b/src/services/domain/pool.ts#L13)
