'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { api } from '~/trpc/react';

interface Question {
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  explanation?: string;
  attachmentUrl?: string;
  difficulty: string;
  topic?: string;
  tags: string[];
  timeLimit?: number;
}

export default function NewQuestionBankPage() {
  const [bankTitle, setBankTitle] = useState('');
  const [bankDescription, setBankDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([{
    text: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
    difficulty: 'medium',
    tags: [],
  }]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createQuestionBank = api.questionBank.create.useMutation({
    onSuccess: () => {
      // TODO: Add toast notification and redirect
      console.log('Question bank created successfully');
    },
  });

  const handleQuestionChange = (field: keyof Question, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  const addNewQuestion = () => {
    setQuestions([...questions, {
      text: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: '',
      difficulty: 'medium',
      tags: [],
    }]);
    setCurrentQuestionIndex(questions.length);
  };

  const navigateQuestion = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Questions</h2>
        <div className="space-y-2">
          {questions.map((_, index) => (
            <Button
              key={index}
              variant={currentQuestionIndex === index ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => setCurrentQuestionIndex(index)}
            >
              Question {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={addNewQuestion}
          >
            + Add Question
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Card className="p-6">
          <div className="mb-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Question Bank Title</label>
              <Input
                value={bankTitle}
                onChange={(e) => setBankTitle(e.target.value)}
                placeholder="Enter question bank title"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Description (Optional)</label>
              <Input
                value={bankDescription}
                onChange={(e) => setBankDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Question {currentQuestionIndex + 1}</h1>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => navigateQuestion('prev')}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => navigateQuestion('next')}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Question Text</label>
              <Input
                value={questions[currentQuestionIndex].text}
                onChange={(e) => handleQuestionChange('text', e.target.value)}
                placeholder="Enter your question"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Option A</label>
                <Input
                  value={questions[currentQuestionIndex].optionA}
                  onChange={(e) => handleQuestionChange('optionA', e.target.value)}
                  placeholder="Option A"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Option B</label>
                <Input
                  value={questions[currentQuestionIndex].optionB}
                  onChange={(e) => handleQuestionChange('optionB', e.target.value)}
                  placeholder="Option B"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Option C</label>
                <Input
                  value={questions[currentQuestionIndex].optionC}
                  onChange={(e) => handleQuestionChange('optionC', e.target.value)}
                  placeholder="Option C"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Option D</label>
                <Input
                  value={questions[currentQuestionIndex].optionD}
                  onChange={(e) => handleQuestionChange('optionD', e.target.value)}
                  placeholder="Option D"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Correct Option</label>
                <Select
                  value={questions[currentQuestionIndex].correctOption}
                  onValueChange={(value) => handleQuestionChange('correctOption', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select correct option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Option A</SelectItem>
                    <SelectItem value="B">Option B</SelectItem>
                    <SelectItem value="C">Option C</SelectItem>
                    <SelectItem value="D">Option D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Difficulty</label>
                <Select
                  value={questions[currentQuestionIndex].difficulty}
                  onValueChange={(value) => handleQuestionChange('difficulty', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Explanation (Optional)</label>
              <Input
                value={questions[currentQuestionIndex].explanation ?? ''}
                onChange={(e) => handleQuestionChange('explanation', e.target.value)}
                placeholder="Explain the correct answer"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Topic (Optional)</label>
                <Input
                  value={questions[currentQuestionIndex].topic ?? ''}
                  onChange={(e) => handleQuestionChange('topic', e.target.value)}
                  placeholder="Enter topic"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Time Limit (seconds)</label>
                <Input
                  type="number"
                  value={questions[currentQuestionIndex].timeLimit ?? ''}
                  onChange={(e) => handleQuestionChange('timeLimit', e.target.value)}
                  placeholder="Time limit in seconds"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={async () => {
                if (!bankTitle) {
                  // TODO: Add error toast
                  return;
                }
                setIsSubmitting(true);
                try {
                  await createQuestionBank.mutateAsync({
                    title: bankTitle,
                    description: bankDescription,
                    questions: questions.map(q => ({
                      ...q,
                      timeLimit: q.timeLimit ? parseInt(q.timeLimit.toString()) : null
                    }))
                  });
                } catch (error) {
                  console.error('Failed to save question bank:', error);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              disabled={isSubmitting}
            >
              Save as Draft
            </Button>
            <Button
              variant="default"
              onClick={async () => {
                if (!bankTitle) {
                  // TODO: Add error toast
                  return;
                }
                setIsSubmitting(true);
                try {
                  await createQuestionBank.mutateAsync({
                    title: bankTitle,
                    description: bankDescription,
                    questions: questions.map(q => ({
                      ...q,
                      timeLimit: q.timeLimit ? parseInt(q.timeLimit.toString()) : null
                    })),
                    status: 'PENDING'
                  });
                } catch (error) {
                  console.error('Failed to submit question bank:', error);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              disabled={isSubmitting}
            >
              Submit for Approval
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}