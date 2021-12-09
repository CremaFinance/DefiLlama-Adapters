[marinade-web](../README.md) / [Exports](../modules.md) / [pool](../modules/pool.md) / Pool

# Interface: Pool

[pool](../modules/pool.md).Pool

The Pool object returned from fetchPools async mapper function

## Hierarchy

- [`PoolConfig`](pool.PoolConfig.md)

  ↳ **`Pool`**

## Properties

### actions

• **actions**: [`Action`](../modules/pool.md#action)[]

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[actions](pool.PoolConfig.md#actions)

#### Defined in

[pool.ts:24](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L24)

___

### address

• `Readonly` **address**: `string`

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[address](pool.PoolConfig.md#address)

#### Defined in

[token.ts:6](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/token.ts#L6)

___

### apy

• **apy**: `number`

#### Overrides

[PoolConfig](pool.PoolConfig.md).[apy](pool.PoolConfig.md#apy)

#### Defined in

[pool.ts:41](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L41)

___

### chainId

• `Readonly` **chainId**: `number`

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[chainId](pool.PoolConfig.md#chainid)

#### Defined in

[token.ts:5](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/token.ts#L5)

___

### decimals

• `Readonly` **decimals**: `number`

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[decimals](pool.PoolConfig.md#decimals)

#### Defined in

[token.ts:8](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/token.ts#L8)

___

### extensions

• `Optional` `Readonly` **extensions**: [`TokenExtensions`](tokenExtensions.TokenExtensions.md)

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[extensions](pool.PoolConfig.md#extensions)

#### Defined in

[token.ts:12](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/token.ts#L12)

___

### liq

• **liq**: `number`

#### Overrides

[PoolConfig](pool.PoolConfig.md).[liq](pool.PoolConfig.md#liq)

#### Defined in

[pool.ts:43](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L43)

___

### logoURI

• `Optional` `Readonly` **logoURI**: `string`

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[logoURI](pool.PoolConfig.md#logouri)

#### Defined in

[token.ts:10](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/token.ts#L10)

___

### marketType

• **marketType**: [`MarketTypes`](../modules/marketTypes.md#markettypes)

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[marketType](pool.PoolConfig.md#markettype)

#### Defined in

[pool.ts:19](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L19)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[name](pool.PoolConfig.md#name)

#### Defined in

[token.ts:7](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/token.ts#L7)

___

### provider

• **provider**: `string`

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[provider](pool.PoolConfig.md#provider)

#### Defined in

[pool.ts:21](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L21)

___

### providerId

• `Optional` **providerId**: `string`

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[providerId](pool.PoolConfig.md#providerid)

#### Defined in

[pool.ts:22](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L22)

___

### rewards

• `Optional` **rewards**: [`Rewards`](../modules/rewards.md#rewards)

#### Overrides

[PoolConfig](pool.PoolConfig.md).[rewards](pool.PoolConfig.md#rewards)

#### Defined in

[pool.ts:39](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L39)

___

### symbol

• `Readonly` **symbol**: `string`

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[symbol](pool.PoolConfig.md#symbol)

#### Defined in

[token.ts:9](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/token.ts#L9)

___

### tags

• `Optional` `Readonly` **tags**: `string`[]

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[tags](pool.PoolConfig.md#tags)

#### Defined in

[token.ts:11](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/token.ts#L11)

___

### tokenA

• **tokenA**: `string`

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[tokenA](pool.PoolConfig.md#tokena)

#### Defined in

[pool.ts:30](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L30)

___

### tokenB

• `Optional` **tokenB**: `string`

#### Inherited from

[PoolConfig](pool.PoolConfig.md).[tokenB](pool.PoolConfig.md#tokenb)

#### Defined in

[pool.ts:31](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L31)

___

### totalLockedValue

• **totalLockedValue**: `number`

#### Overrides

[PoolConfig](pool.PoolConfig.md).[totalLockedValue](pool.PoolConfig.md#totallockedvalue)

#### Defined in

[pool.ts:42](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L42)

___

### tradingApy

• **tradingApy**: `number`

#### Overrides

[PoolConfig](pool.PoolConfig.md).[tradingApy](pool.PoolConfig.md#tradingapy)

#### Defined in

[pool.ts:40](https://github.com/marinade-finance/marinade-web/blob/d10a23f/src/services/domain/pool.ts#L40)
