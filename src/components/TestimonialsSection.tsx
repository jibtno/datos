import React from 'react';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Santos",
      role: "Real Estate Broker",
      company: "Century 21 BGC",
      quote: "My clients love the instant ROI calculations. Closed 3 deals this month using these insights.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Property Investor", 
      company: "BGC Portfolio",
      quote: "Finally, accurate occupancy data for Metro Manila. This tool paid for itself in one investment decision.",
      rating: 5
    },
    {
      name: "Jennifer Cruz",
      role: "Airbnb Host",
      company: "Makati Properties",
      quote: "The market trends helped me optimize my pricing. Revenue up 23% in the first quarter.",
      rating: 5
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Philippine Property Professionals
          </h2>
          <p className="text-lg text-gray-600">
            Join 500+ brokers and investors making smarter decisions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
                <p className="text-xs text-gray-500">{testimonial.company}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;