import { PlayerPosition } from '../player';

// @docstart api/players/update
export type UpdateOption = {
  firstName: string;
  lastName: string;
  team: string;
  position: PlayerPosition;
  age: number;
};
// @docend
