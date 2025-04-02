'use client';

import { useState } from "react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface QuestionProps {
  examName: string;
  year: string;
  subject: string;
  question: string;
  type: string;
  options: string[];
  correctAnswer: string;
  description: string;
  images?: string[];
}

export function QuestionCard({
  examName,
  year,
  subject,
  question,
  type,
  options,
  correctAnswer,
  description,
  images
}: QuestionProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="p-4 mb-4">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-sm text-blue-600 font-medium">{examName} {year}</span>
            <h3 className="text-lg font-medium mt-1">{question}</h3>
          </div>
          <span className="text-sm bg-neutral-100 px-2 py-1 rounded">{type}</span>
        </div>
        
        <div className="mt-4 space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
              <span>{option}</span>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          className="w-full mt-4"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <ChevronUp className="h-4 w-4 mr-2" />
          ) : (
            <ChevronDown className="h-4 w-4 mr-2" />
          )}
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>

        {showDetails && (
          <div className="mt-4 pt-4 border-t">
            <div className="mb-4">
              <h4 className="font-medium mb-2">Correct Answer:</h4>
              <p className="text-green-600">{correctAnswer}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Description:</h4>
              <p className="text-neutral-600 whitespace-pre-line">{description}</p>
            </div>
            {images && images.length > 0 && (
              <div className="mt-4">
                {images.map((image, index) => (
                  <img 
                    key={index}
                    src={image}
                    alt={`Question image ${index + 1}`}
                    className="max-w-full rounded-lg mt-2"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}