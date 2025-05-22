'use client';

import { useState } from 'react';
import type { AISymptomCheckerInput, AISymptomCheckerOutput } from '@/ai/flows/ai-symptom-checker';
import { aiSymptomChecker } from '@/ai/flows/ai-symptom-checker';
import SymptomCheckerForm from '@/components/symptom-checker/SymptomCheckerForm';
import SymptomCheckerResults from '@/components/symptom-checker/SymptomCheckerResults';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AISymptomCheckerPage() {
  const [results, setResults] = useState<AISymptomCheckerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: AISymptomCheckerInput) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const response = await aiSymptomChecker(data);
      setResults(response);
    } catch (e) {
      console.error(e);
      setError('An error occurred while checking symptoms. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight text-center">AI Symptom Checker</CardTitle>
          <CardDescription className="text-center text-lg">
            Enter your symptoms below to get an AI-powered assessment. This tool is for informational purposes only and not a substitute for professional medical advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SymptomCheckerForm onSubmit={handleSubmit} isLoading={isLoading} />
          {error && (
            <Alert variant="destructive" className="mt-6">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {results && <SymptomCheckerResults results={results} />}
        </CardContent>
      </Card>
    </div>
  );
}
