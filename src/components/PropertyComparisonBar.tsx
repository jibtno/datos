import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, BarChart3 } from 'lucide-react';

interface PropertyComparisonBarProps {
  selectedProperties: string[];
  onRemoveProperty: (id: string) => void;
  onCompare: () => void;
}

const PropertyComparisonBar = ({ selectedProperties, onRemoveProperty, onCompare }: PropertyComparisonBarProps) => {
  if (selectedProperties.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <Card className="p-4 shadow-lg border-2 bg-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-900">
              {selectedProperties.length} properties selected
            </span>
          </div>
          
          <div className="flex gap-2">
            {selectedProperties.map((id) => (
              <div key={id} className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded">
                <span className="text-xs text-blue-800">Property {id}</span>
                <button
                  onClick={() => onRemoveProperty(id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={onCompare}
            disabled={selectedProperties.length < 2}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Compare Now
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PropertyComparisonBar;