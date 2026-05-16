import React from 'react';
import { cn } from '../../../lib/utils';

interface MarketOptionProps {
  id: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const MarketOption: React.FC<MarketOptionProps> = ({ 
  id, 
  label, 
  isSelected, 
  onClick,
  disabled = false
}) => {
  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "py-5 px-1 rounded-2xl border-2 transition-all active:scale-95 flex flex-col items-center justify-center gap-2 text-center shadow-sm",
        isSelected 
          ? "bg-[#FFB10A] border-[#FFB10A] text-white shadow-md scale-[1.02]" 
          : "bg-white border-white text-gray-600 hover:border-[#FFB10A]",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className={cn(
        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
        isSelected ? "border-white" : "border-[#FFB10A]/30"
      )}>
        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>
      <span className={cn(
        "text-[8px] md:text-[9px] font-black uppercase tracking-tight leading-tight truncate whitespace-nowrap px-1",
        isSelected ? "text-white" : "text-gray-900"
      )}>
        {label}
      </span>
    </button>
  );
};

export default MarketOption;
