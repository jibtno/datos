import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Clock } from 'lucide-react';
import InvestmentCalculatorModal from './InvestmentCalculatorModal';

const MiniROISimulator = () => {
  return (
    <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Estimate your ROI</p>
            <p className="text-sm text-gray-600">Get personalized returns in 30 seconds</p>
          </div>
        </div>
        <InvestmentCalculatorModal
          trigger={
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-gray-50">
              <Clock className="h-4 w-4 mr-1 text-gray-50" />
              Calculate
            </Button>
          }
        />
      </div>
    </Card>
  );
};

export default MiniROISimulator;