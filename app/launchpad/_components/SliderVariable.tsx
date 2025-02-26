/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@heroui/button';
import { Slider } from '@heroui/slider';

export default function SliderVariable({
  amounts,
  setAmounts,
  locked,
  setLocked,
}: {
  amounts: Record<string, number>;
  setAmounts: React.Dispatch<React.SetStateAction<{
    bottomAmount: number;
    anchorAmount: number;
    discoveryAmount: number;
    allocationAmount: number;
  }>>;
  locked: Record<string, boolean>;
  setLocked: any;
}) {
  const adjustAmounts = (key: string, newValue: number) => {
    if (locked[key as keyof typeof locked]) return;
  
    // newValue = Math.min(1, Math.max(0, newValue));
  
    const lockedKeys = Object.keys(amounts).filter((k) => locked[k as keyof typeof locked]);
    const unlockedKeys = Object.keys(amounts).filter((k) => !locked[k as keyof typeof locked] && k !== key);
  
    const lockedTotal = lockedKeys.reduce((sum, k) => sum + amounts[k as keyof typeof amounts], 0);
    let remainingValue = 1 - (lockedTotal + newValue);
  
    if (remainingValue < 0) {
      newValue += remainingValue;
      remainingValue = 0;
    }
  
    const newAmounts = {
      bottomAmount: amounts.bottomAmount,
      anchorAmount: amounts.anchorAmount,
      discoveryAmount: amounts.discoveryAmount,
      allocationAmount: amounts.allocationAmount,
      [key]: newValue,
    };
  
    if (remainingValue === 0) {
      unlockedKeys.forEach((k) => {
        newAmounts[k as keyof typeof amounts] = 0;
      });
    } else {
      const currentTotalUnlocked = unlockedKeys.reduce((sum, k) => sum + amounts[k as keyof typeof amounts], 0);
      if (currentTotalUnlocked === 0) {
        unlockedKeys.forEach((k) => {
          newAmounts[k as keyof typeof amounts] = remainingValue / unlockedKeys.length;
        });
      } else {
        unlockedKeys.forEach((k) => {
          newAmounts[k as keyof typeof amounts] = (amounts[k as keyof typeof amounts] / currentTotalUnlocked) * remainingValue;
        });
      }
    }
  
    setAmounts(newAmounts);
  };
  

  const toggleLock = (key: string) => {
    const lockedCount = Object.values(locked).filter((v) => v).length;
    if (!locked[key as keyof typeof locked] && lockedCount >= 2) return;

    setLocked((prev: any) => ({
      ...prev,
      [key]: !prev[key as keyof typeof locked],
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(amounts).map(([key, value]) => (
        <div key={key} className="flex items-center space-x-2">
          <Slider
            className="w-full"
            formatOptions={{ style: "percent" }}
            label={key.replace("Amount", " Amount")}
            maxValue={1}
            minValue={0}
            step={0.01}
            onChange={(val) => adjustAmounts(key, Array.isArray(val) ? val[0] : val)}
            value={value}
            isDisabled={locked[key as keyof typeof locked]}
          />
          <Button
            type="button"
            variant='flat'
            color={locked[key as keyof typeof locked] ? "danger" : "default"}
            onPress={() => toggleLock(key)}
            disabled={locked[key as keyof typeof locked] && Object.values(locked).filter((v) => !v).length === 1}
          >
            {locked[key as keyof typeof locked] ? "🔒" : "🔓"}
          </Button>
        </div>
      ))}
    </div>
  )
}
