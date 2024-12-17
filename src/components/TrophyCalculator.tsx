import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Trophy } from 'lucide-react';
import { getTrophyValues, GameMode } from '../lib/trophyData';

interface TrophyDetails {
  victory: number;
  defeat: number;
}

const TrophyCalculator: React.FC = () => {
  const [trophies, setTrophies] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<GameMode>('3v3');

  const calculateWinRate = (mode: GameMode, trophyCount: string): string | null => {
    const count = parseInt(trophyCount);
    if (isNaN(count) || trophyCount === '') return null;

    const { victory: trophyGain, defeat: trophyLoss } = getTrophyValues(mode, count);
    // Special case for 0 trophy range where defeat is 0
    if (trophyLoss === 0) return "0.01";
    const requiredWinRate = (Math.abs(trophyLoss) / (trophyGain + Math.abs(trophyLoss))) * 100 + 0.01;
    return requiredWinRate.toFixed(2);
  };

  const getTrophyDetails = (mode: GameMode, trophyCount: string): TrophyDetails | null => {
    const count = parseInt(trophyCount);
    if (isNaN(count) || trophyCount === '') return null;
    return getTrophyValues(mode, count);
  };

  const renderModeContent = () => {
    const trophyDetails = getTrophyDetails(selectedMode, trophies);
    const winRate = calculateWinRate(selectedMode, trophies);

    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          {selectedMode === '3v3' ? '3v3' : 'Duels'} Mode Results
        </h3>
        {trophies ? (
          <div>
            <div className="mb-4">
              <p className="text-sm mb-1">Trophy changes per match:</p>
              <div className="flex gap-4">
                <div className="text-green-600">
                  <span className="font-bold">
                    Win: +{trophyDetails?.victory}
                  </span>
                </div>
                <div className="text-red-600">
                  <span className="font-bold">
                    Loss: {trophyDetails?.defeat}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm mb-2">Required win rate to gain trophies:</p>
            <p className="text-3xl font-bold text-blue-600">
              {winRate}%
            </p>
            <p className="text-xs text-gray-600 mt-2">
              This is the minimum win rate needed to maintain or increase your trophy count.
            </p>
          </div>
        ) : (
          <p className="text-gray-600">
            Enter your trophy count to see the required win rate.
          </p>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">Brawl Stars Trophy Calculator</h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Current Trophy Count</label>
          <Input
            type="number"
            value={trophies}
            onChange={(e) => setTrophies(e.target.value)}
            placeholder="Enter trophy count"
            className="w-full"
          />
        </div>

        <Tabs defaultValue="3v3" onValueChange={(value) => setSelectedMode(value as GameMode)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="3v3">3v3</TabsTrigger>
            <TabsTrigger value="duels">Duels</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedMode} className="mt-4">
            {renderModeContent()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrophyCalculator;