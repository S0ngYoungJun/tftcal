export interface TierProbabilities {
  [key: number]: {
    [key: number]: number;
  };
}

export interface ChampionPool {
  [key: number]: {
    count: number;
    types: number;
  };
}