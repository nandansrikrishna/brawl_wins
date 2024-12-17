interface TrophyRange {
    min: number;
    max: number;
    victory: number;
    defeat: number;
}

interface TrophyCalculations {
"3v3": TrophyRange[];
"duels": TrophyRange[];
}

export type GameMode = keyof TrophyCalculations;

export const TROPHY_CALCULATIONS: TrophyCalculations = {
"3v3": [
    { min: 0, max: 49, victory: 8, defeat: 0 },
    { min: 50, max: 99, victory: 8, defeat: -1 },
    { min: 100, max: 199, victory: 8, defeat: -2 },
    { min: 200, max: 599, victory: 8, defeat: -3 },
    { min: 600, max: 699, victory: 8, defeat: -4 },
    { min: 700, max: 799, victory: 8, defeat: -5 },
    { min: 800, max: 899, victory: 8, defeat: -6 },
    { min: 900, max: 999, victory: 8, defeat: -7 },
    { min: 1000, max: 1099, victory: 8, defeat: -8 },
    { min: 1100, max: 1199, victory: 7, defeat: -11 },
    { min: 1200, max: 1299, victory: 6, defeat: -13 },
    { min: 1300, max: 1399, victory: 5, defeat: -16 },
    { min: 1400, max: 1499, victory: 4, defeat: -19 },
    { min: 1500, max: 1599, victory: 3, defeat: -22 },
    { min: 1600, max: 1699, victory: 2, defeat: -25 },
    { min: 1700, max: 1799, victory: 1, defeat: -28 },
    { min: 1800, max: 1899, victory: 1, defeat: -31 },
    { min: 1900, max: 1999, victory: 1, defeat: -34 },
    { min: 2000, max: Infinity, victory: 1, defeat: -50 }
    ],
    "duels": [
    { min: 0, max: 49, victory: 9, defeat: -1 },
    { min: 50, max: 599, victory: 9, defeat: -3 },
    { min: 600, max: 899, victory: 9, defeat: -6 },
    { min: 900, max: 1099, victory: 9, defeat: -9 },
    { min: 1100, max: 1199, victory: 9, defeat: -12 },
    { min: 1200, max: 1299, victory: 6, defeat: -15 },
    { min: 1300, max: 1399, victory: 6, defeat: -18 },
    { min: 1400, max: 1499, victory: 6, defeat: -21 },
    { min: 1500, max: 1599, victory: 3, defeat: -24 },
    { min: 1600, max: 1699, victory: 3, defeat: -27 },
    { min: 1700, max: 1799, victory: 3, defeat: -30 },
    { min: 1800, max: 1899, victory: 3, defeat: -33 },
    { min: 1900, max: 1999, victory: 3, defeat: -36 },
    { min: 2000, max: Infinity, victory: 3, defeat: -51 }
    ]
};

export const getTrophyValues = (mode: GameMode, trophyCount: number): TrophyRange => {
    const ranges = TROPHY_CALCULATIONS[mode];
    const range = ranges.find(r => trophyCount >= r.min && trophyCount <= r.max);
    return range || ranges[ranges.length - 1]; // Return last range if trophy count exceeds all ranges
};