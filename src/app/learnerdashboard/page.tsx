'use client';

import { auth } from "~/server/auth";
import Header from "~/app/Header";
import { QuestionFilters, type FilterValues } from "../_components/QuestionFilters";
import { QuestionCard } from "../_components/QuestionCard";
import { useState } from "react";

// Example question data - replace with actual data from your API
const sampleQuestions = [
  {
    examName: "GATE AR",
    year: "2010",
    subject: "Building Materials",
    question: "Natural granite used for cladding in Buildings belongs to the category of?",
    type: "Theory",
    options: ["Igneous Rock", "Acid Rock", "Sedimentary", "Metamorphic rock"],
    correctAnswer: "Igneous Rock",
    description: "Natural granite used for cladding in buildings belongs to the Igneous Rock category...",
    images: []
  },
  // Add more questions
];

export default function LearnerDashboard() {
  const [filteredQuestions, setFilteredQuestions] = useState(sampleQuestions);

  const handleFilterChange = (filters: FilterValues) => {
    const filtered = sampleQuestions.filter(question => {
      const matchesExamYear = filters.examYears.length === 0 || 
        filters.examYears.includes(`${question.examName}-${question.year}`);
      const matchesSubject = filters.subjects.length === 0 || 
        filters.subjects.includes(question.subject);
      const matchesType = filters.questionTypes.length === 0 || 
        filters.questionTypes.includes(question.type);
      const matchesSearch = !filters.searchQuery || 
        question.question.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return matchesExamYear && matchesSubject && matchesType && matchesSearch;
    });

    setFilteredQuestions(filtered);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header title="Learner Dashboard" user={null} />
      
      <div className="container mx-auto px-4 py-8">
        <QuestionFilters onFilterChange={handleFilterChange} />
        
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <QuestionCard
              key={index}
              {...question}
            />
          ))}
        </div>
      </div>
    </div>
  );
}