[marinade-web](../README.md) / [Exports](../modules.md) / providers

# Module: providers

## Type aliases

### Provider

Ƭ **Provider**: `Object`

The provider object that will be exported

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `fetchPools` | [`FetchPools`](pool.md#fetchpools) | See FetchPools docs for more info |
| `pools` | `Record`<`string`, [`PoolConfig`](../interfaces/pool.PoolConfig.md)\> | All provider pool config records |

#### Defined in

[providers.ts:4](https://github.com/marinade-finance/marinade-web/blob/e32749b/src/services/domain/providers.ts#L4)

___

### Providers

Ƭ **Providers**<`P`\>: `Record`<`P`, [`Provider`](providers.md#provider)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `string` |

#### Defined in

[providers.ts:11](https://github.com/marinade-finance/marinade-web/blob/e32749b/src/services/domain/providers.ts#L11)
