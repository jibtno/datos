import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calculator, TrendingUp } from 'lucide-react';

interface InvestmentCalculatorModalProps {
  trigger: React.ReactNode;
}

const InvestmentCalculatorModal = ({ trigger }: InvestmentCalculatorModalProps) => {
  const [propertyPrice, setPropertyPrice] = useState(5000000);
  const [downPayment, setDownPayment] = useState(20);
  const [monthlyRate, setMonthlyRate] = useState(3400);
  const [occupancyRate, setOccupancyRate] = useState(73);

  const calculateROI = () => {
    const annualRevenue = monthlyRate * 12 * (occupancyRate / 100);
    const totalInvestment = propertyPrice * (downPayment / 100);
    return ((annualRevenue / totalInvestment) * 100).toFixed(1);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Investment Calculator - Metro Manila
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Property Price</label>
                <input
                  type="number"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Down Payment (%)</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Monthly Rate (₱)</label>
                <input
                  type="number"
                  value={monthlyRate}
                  onChange={(e) => setMonthlyRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Occupancy Rate (%)</label>
                <input
                  type="number"
                  value={occupancyRate}
                  onChange={(e) => setOccupancyRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
          
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">Estimated Annual ROI</span>
              </div>
              <div className="text-4xl font-bold text-green-600">{calculateROI()}%</div>
              <p className="text-sm text-gray-600 mt-2">
                Based on ₱{(monthlyRate * 12 * (occupancyRate / 100)).toLocaleString()} annual revenue
              </p>
            </div>
          </Card>
          
          <div className="text-xs text-gray-500 text-center">
            * This is an estimate. Actual returns may vary based on market conditions, expenses, and other factors.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentCalculatorModal;
