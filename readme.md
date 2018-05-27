# [cash](https://github.com/geekjuice/cash)

> ephemeral local cache

## install

```
// npm
❯ npm install --global @geekjuice/cash
```

### usage

**basic**

```typescript
import { cache } from '@geekjuice/cash';

export default (key: string, ...rest) =>
  cached<number>(key, async (): number => expensive(...rest));
```

**custom transform/parse**

```typescript
import { cache } from '@geekjuice/cash';

export default (key: string, ...rest) =>
  cached<number>(
    key,
    async (): number => expensive(...rest),
    (to: number): string => `{ "cached": ${to} }`,
    (from: string): number => JSON.parse(from).cached
  );
```

### license

[mit](license.md)
