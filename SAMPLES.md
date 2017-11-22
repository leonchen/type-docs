# API

## Players

### List

```typescript
export type PlayerPosition = 'SG' | 'PG' | 'PF' | 'SF' | 'C';
export type ListPlayersOptions = {
  firstName: string;
  lastName: string;
  team: string;
  position: PlayerPosition;
  age: number;
};
```

### Show

```typescript
export type Player = {
  firstName: string;
  lastName: string;
  fullName: string;
  team: string;
  position: PlayerPosition;
  age: number;
  birthday: string;
  height: number;
  weight: number;
};
```

### Update

```typescript
export type UpdateOption = {
  firstName: string;
  lastName: string;
  team: string;
  position: PlayerPosition;
  age: number;
};
```
