[marinade-web](../README.md) / [Exports](../modules.md) / [pool](../modules/pool.md) / PoolConfig

# Interface: PoolConfig

[pool](../modules/pool.md).PoolConfig

An interface that extends [[`Token`]] and adds more properties to support integration

The required properties should be declared at dev time

## Hierarchy

- [`Token`](token.Token.md)

  ↳ **`PoolConfig`**

  ↳↳ [`Pool`](pool.Pool.md)

## Properties

### actions

• **actions**: [`Action`](../modules/pool.md#action)[]

#### Defined in

[pool.ts:25](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/pool.ts#L25)

___

### address

• `Readonly` **address**: `string`

#### Inherited from

[Token](token.Token.md).[address](token.Token.md#address)

#### Defined in

[token.ts:6](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/token.ts#L6)

___

### apy

• `Optional` **apy**: `number`

#### Defined in

[pool.ts:28](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/pool.ts#L28)

___

### chainId

• `Readonly` **chainId**: `number`

#### Inherited from

[Token](token.Token.md).[chainId](token.Token.md#chainid)

#### Defined in

[token.ts:5](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/token.ts#L5)

___

### decimals

• `Readonly` **decimals**: `number`

#### Inherited from

[Token](token.Token.md).[decimals](token.Token.md#decimals)

#### Defined in

[token.ts:8](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/token.ts#L8)

___

### extensions

• `Optional` `Readonly` **extensions**: [`TokenExtensions`](tokenExtensions.TokenExtensions.md)

#### Inherited from

[Token](token.Token.md).[extensions](token.Token.md#extensions)

#### Defined in

[token.ts:12](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/token.ts#L12)

___

### liq

• `Optional` **liq**: `number`

#### Defined in

[pool.ts:30](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/pool.ts#L30)

___

### logoURI

• `Optional` `Readonly` **logoURI**: `string`

#### Inherited from

[Token](token.Token.md).[logoURI](token.Token.md#logouri)

#### Defined in

[token.ts:10](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/token.ts#L10)

___

### marketType

• **marketType**: [`MarketTypes`](../modules/marketTypes.md#markettypes)

#### Defined in

[pool.ts:19](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/pool.ts#L19)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Token](token.Token.md).[name](token.Token.md#name)

#### Defined in

[token.ts:7](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/token.ts#L7)

___

### provider

• **provider**: `string`

#### Defined in

[pool.ts:21](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/pool.ts#L21)

___

### providerId

• `Optional` **providerId**: `string`

#### Defined in

[pool.ts:23](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/pool.ts#L23)

___

### rewards

• `Optional` **rewards**: [`RewardsConfig`](../modules/rewards.md#rewardsconfig)

#### Defined in

[pool.ts:26](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/pool.ts#L26)

___

### symbol

• `Readonly` **symbol**: `string`

#### Inherited from

[Token](token.Token.md).[symbol](token.Token.md#symbol)

#### Defined in

[token.ts:9](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/token.ts#L9)

___

### tags

• `Optional` `Readonly` **tags**: `string`[]

#### Inherited from

[Token](token.Token.md).[tags](token.Token.md#tags)

#### Defined in

[token.ts:11](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/token.ts#L11)

___

### tokenA

• **tokenA**: `string`

#### Defined in

[pool.ts:31](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/pool.ts#L31)

___

### tokenB

• `Optional` **tokenB**: `string`

#### Defined in

[pool.ts:32](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/pool.ts#L32)

___

### totalLockedValue

• `Optional` **totalLockedValue**: `number`

#### Defined in

[pool.ts:29](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/pool.ts#L29)

___

### tradingApy

• `Optional` **tradingApy**: `number`

#### Defined in

[pool.ts:27](https://github.com/marinade-finance/marinade-web/blob/3661e26/src/services/domain/pool.ts#L27)
