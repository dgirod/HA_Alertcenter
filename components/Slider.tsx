
import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, min = 0, max = 100, step = 1, onChange }) => {
  return (
    <div>
      <label className="flex justify-between items-center text-sm font-medium text-slate-700 mb-2">
        <span>{label}</span>
        <span className="font-bold text-blue-600 bg-blue-100 py-1 px-3 rounded-full">{value}%</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default Slider;
