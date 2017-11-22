// @docstart API/Players/List
export type PlayerPosition = 'SG' | 'PG' | 'PF' | 'SF' | 'C';
export type ListPlayersOptions = {
  firstName: string;
  lastName: string;
  team: string;
  position: PlayerPosition;
  age: number;
};
// @docend

// @docstart API/Players/Show
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
// @docend
