export type ListPlayersOptions = {
  firstName: string;
  lastName: string;
  team: string;
  position: 'SG' | 'PG' | 'PF' | 'SF' | 'C';
  age: number;
};
