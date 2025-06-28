import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TrendingUp } from 'lucide-react';

interface PriceTooltipProps {
  price: number;
  children: React.ReactNode;
}

const PriceTooltip = ({ price, children }: PriceTooltipProps) => {
  const pricePerSqm = Math.round(price / 35); // Assuming average 35sqm
  const roiPotential = "18-24%";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="font-medium">Investment Details</span>
            </div>
            <div className="text-sm space-y-1">
              <p>₱{pricePerSqm.toLocaleString()}/sqm</p>
              <p className="text-green-600">ROI: {roiPotential}</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PriceTooltip;
