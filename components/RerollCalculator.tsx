'use client'
import { useState } from 'react';
import type { TierProbabilities, ChampionPool } from '../types';

const tierProbabilities: TierProbabilities = {
  1: { 1: 100, 2: 0, 3: 0, 4: 0, 5: 0 },
  2: { 1: 100, 2: 0, 3: 0, 4: 0, 5: 0 },
  3: { 1: 75, 2: 25, 3: 0, 4: 0, 5: 0 },
  4: { 1: 55, 2: 30, 3: 15, 4: 0, 5: 0 },
  5: { 1: 45, 2: 33, 3: 20, 4: 2, 5: 0 },
  6: { 1: 25, 2: 40, 3: 30, 4: 5, 5: 0 },
  7: { 1: 19, 2: 30, 3: 35, 4: 15, 5: 1 },
  8: { 1: 14, 2: 20, 3: 35, 4: 25, 5: 6 },
  9: { 1: 10, 2: 15, 3: 30, 4: 30, 5: 15 },
};

const championPool: ChampionPool = {
  1: { count: 22, types: 13 },
  2: { count: 20, types: 13 },
  3: { count: 17, types: 13 },
  4: { count: 10, types: 12 },
  5: { count: 9, types: 10 },
};

const calculateExpectedGold = (level: number, tier: number, owned: number, othersOwned: number, targetCount: number) => {
  const remainingChamps = championPool[tier].count - owned - othersOwned;
  const totalChampsInPool = championPool[tier].count * championPool[tier].types;
  const probability = (tierProbabilities[level][tier] / 100) * (remainingChamps / totalChampsInPool); 
  const neededChamps = targetCount - owned;

  if (probability <= 0) {
    return Infinity; // 불가능한 경우
  }

  const expectedRolls = neededChamps / probability;
  return expectedRolls * 2; // 리롤당 2골드 소모
};

const RerollCalculator: React.FC = () => {
  const [level, setLevel] = useState<number>(8);
  const [tier, setTier] = useState<number>(4);
  const [owned, setOwned] = useState<number>(0);
  const [othersOwned, setOthersOwned] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number>(3); // 2성 기준 3개, 3성 기준 9개
  const [expectedGold, setExpectedGold] = useState<number | null>(null);

  const calculate = () => {
    const gold = calculateExpectedGold(level, tier, owned, othersOwned, targetCount);
    setExpectedGold(gold);
  };

  return (
    <div>
      <div>
        <label>
          Player Level:
          <input
            type="number"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            min="1"
            max="9"
          />
        </label>
      </div>
      <div>
        <label>
          Champion Tier:
          <input
            type="number"
            value={tier}
            onChange={(e) => setTier(Number(e.target.value))}
            min="1"
            max="5"
          />
        </label>
      </div>
      <div>
        <label>
          Owned:
          <input
            type="number"
            value={owned}
            onChange={(e) => setOwned(Number(e.target.value))}
            min="0"
          />
        </label>
      </div>
      <div>
        <label>
          Others Owned:
          <input
            type="number"
            value={othersOwned}
            onChange={(e) => setOthersOwned(Number(e.target.value))}
            min="0"
          />
        </label>
      </div>
      <div>
        <label>
          Target Count (3 for 2-star, 9 for 3-star):
          <input
            type="number"
            value={targetCount}
            onChange={(e) => setTargetCount(Number(e.target.value))}
            min="1"
          />
        </label>
      </div>
      <button onClick={calculate}>Calculate</button>
      {expectedGold !== null && (
        <div>
          <h2>Expected Gold: {expectedGold.toFixed(2)}</h2>
          <h2>Expected Rolls: {(expectedGold / 2).toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default RerollCalculator;