'use client';

import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

interface FilterProps {
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  examYears: string[];
  subjects: string[];
  questionTypes: string[];
  searchQuery: string;
}

const EXAM_YEARS = ["GATE-2010", "GATE-2011", "GATE-2012"];
const SUBJECTS = ["Building Materials", "Construction", "Architecture"];
const QUESTION_TYPES = ["Theory", "Numerical", "MSQ"];

export function QuestionFilters({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterValues>({
    examYears: [],
    subjects: [],
    questionTypes: [],
    searchQuery: "",
  });

  const handleCheckboxChange = (category: keyof Omit<FilterValues, 'searchQuery'>, value: string) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    const newFilters = { ...filters, [category]: newValues };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium mb-4">Filters</h3>
      
      <Input
        placeholder="Search questions..."
        value={filters.searchQuery}
        onChange={(e) => {
          const newFilters = { ...filters, searchQuery: e.target.value };
          setFilters(newFilters);
          onFilterChange(newFilters);
        }}
        className="mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4">
          <h4 className="font-medium mb-3">Exam Year</h4>
          <div className="space-y-2">
            {EXAM_YEARS.map((year) => (
              <label key={year} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.examYears.includes(year)}
                  onCheckedChange={() => handleCheckboxChange('examYears', year)}
                />
                <span>{year}</span>
              </label>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-3">Subject</h4>
          <div className="space-y-2">
            {SUBJECTS.map((subject) => (
              <label key={subject} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.subjects.includes(subject)}
                  onCheckedChange={() => handleCheckboxChange('subjects', subject)}
                />
                <span>{subject}</span>
              </label>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-3">Question Type</h4>
          <div className="space-y-2">
            {QUESTION_TYPES.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.questionTypes.includes(type)}
                  onCheckedChange={() => handleCheckboxChange('questionTypes', type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}